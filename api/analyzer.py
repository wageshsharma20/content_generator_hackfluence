from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None


def analyze_product(name, price, description, image_base64=None):
    if not client:
        return {
            "category": "General Product",
            "audience": "Broad Audience",
            "interests": ["lifestyle"],
            "keywords": ["general"],
            "sustainability_score": 50,
            "market_demand": "Medium",
            "ai_confidence": 50
        }

    prompt = f"""
Analyze this product and return ONLY valid JSON.

CRITICAL INSTRUCTION: You must categorize the product EXACTLY into ONE of the following strict categories. Do NOT output any other category name.
- "Fitness"
- "Food"
- "Travel"
- "Beauty"
- "Tech"
- "Gaming"
- "Fashion"

Product Name: {name}
Price: ₹{price}
Description: {description}

If the product is a smartphone, laptop, or electronic device, the category MUST be "Tech".
If the product is related to clothes, the category MUST be "Fashion".
Prioritize the Product Name and Description over the image. If the Product Name says "Smartphone", it is "Tech".
Do not make up new categories. Pick the closest match from the list above.
Estimate a sustainability_score out of 100.
Estimate market_demand as "Low", "Medium", or "High".
Estimate ai_confidence out of 100.

Return JSON with exactly this structure:

{{
  "category": "string",
  "audience": "string",
  "interests": ["string", "string", "string"],
  "keywords": ["string", "string", "string"],
  "sustainability_score": 85,
  "market_demand": "High",
  "ai_confidence": 95
}}

Return ONLY JSON.
Do not use markdown.
Do not use ```json.
Do not add explanations.
"""

    contents = [prompt]
    if image_base64:
        import base64
        from google.genai import types
        # Frontend passes data:image/jpeg;base64,xxxx...
        try:
            if "," in image_base64:
                header, encoded = image_base64.split(",", 1)
                mime_type = header.split(":")[1].split(";")[0]
            else:
                encoded = image_base64
                mime_type = "image/jpeg"
                
            contents.append(
                types.Part.from_bytes(
                    data=base64.b64decode(encoded),
                    mime_type=mime_type,
                )
            )
        except Exception as e:
            print(f"Error parsing image: {e}")

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=contents
        )
        print("Raw Gemini Response:\n")
        print(response.text)
        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "", 1)

        if text.startswith("```"):
            text = text.replace("```", "", 1)

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()
    except Exception as e:
        print(f"Warning: Gemini API failed ({e}). Using fallback analysis.")
        return {
            "category": "Tech",
            "audience": "Broad Audience",
            "interests": ["technology"],
            "keywords": ["gadgets"],
            "sustainability_score": 50,
            "market_demand": "Medium",
            "ai_confidence": 50
        }

    try:
        parsed = json.loads(text)
    except Exception as e:
        # Fallback if Gemini hallucinates completely
        return {
            "category": "General Product",
            "audience": "Broad Audience",
            "interests": ["lifestyle"],
            "keywords": ["general"],
            "sustainability_score": 50,
            "market_demand": "Medium",
            "ai_confidence": 50
        }

    # Ensure all keys exist so frontend doesn't break
    result = {
        "category": parsed.get("category", "General"),
        "audience": parsed.get("audience", "Broad Audience"),
        "interests": parsed.get("interests", ["lifestyle"]),
        "keywords": parsed.get("keywords", ["product"]),
        "sustainability_score": parsed.get("sustainability_score", 50),
        "market_demand": parsed.get("market_demand", "Medium"),
        "ai_confidence": parsed.get("ai_confidence", 50)
    }
    
    return result


if __name__ == "__main__":

    result = analyze_product(
        "Handmade Terracotta Vase",
        800,
        "Eco-friendly handmade pottery"
    )

    print("\nParsed JSON:\n")
    print(json.dumps(result, indent=2))