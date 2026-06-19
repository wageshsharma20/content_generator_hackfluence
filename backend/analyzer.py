from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

REQUIRED_KEYS = {"category", "audience", "interests", "keywords"}


def analyze_product(name, price, description):

    prompt = f"""
Analyze this product and return ONLY valid JSON.

Product Name: {name}
Price: ₹{price}
Description: {description}

Return JSON with exactly this structure:

{{
  "category": "string",
  "audience": "string",
  "interests": ["string", "string", "string"],
  "keywords": ["string", "string", "string"]
}}

Return ONLY JSON.
Do not use markdown.
Do not use ```json.
Do not add explanations.
"""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
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

    result = json.loads(text)

    assert set(result.keys()) == REQUIRED_KEYS, (
        f"Unexpected keys: {result.keys()}"
    )

    return result


if __name__ == "__main__":

    result = analyze_product(
        "Handmade Terracotta Vase",
        800,
        "Eco-friendly handmade pottery"
    )

    print("\nParsed JSON:\n")
    print(json.dumps(result, indent=2))