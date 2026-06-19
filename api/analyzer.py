from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

REQUIRED_KEYS = {"category", "audience", "interests", "keywords", "sustainability_score", "market_demand", "ai_confidence"}


def analyze_product(name, price, description):

    prompt = f"""
Analyze this product and return ONLY valid JSON.

Product Name: {name}
Price: ₹{price}
Description: {description}

Categorize the product exactly as what it is (e.g., if it's a Mango, the category should be "Fruit/Produce" or "Food"). Do not force it into "Home Decor" or "Creator-Commerce" if it is not.
Estimate a sustainability_score out of 100 based on how eco-friendly the description is.
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

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
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