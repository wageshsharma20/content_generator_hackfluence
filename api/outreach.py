from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_outreach(
    product_name,
    analysis,
    influencer,
    commission_pct=15
):
    interests = ", ".join(
        analysis["interests"]
    )

    prompt = f"""
Write a short influencer collaboration message.

Influencer:
{influencer['name']}

Niche:
{influencer['niche']}

Audience:
{influencer['audience']}

Product:
{product_name}

Category:
{analysis['category']}

Relevant Interests:
{interests}

Commission:
{commission_pct}%

Requirements:
- Friendly
- Professional
- 4 to 6 sentences
- Mention why their audience is a fit
- Mention commission
- End with a call to action

Return only the message.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    return response.text.strip()






if __name__ == "__main__":

    from analyzer import analyze_product
    from influencers import get_influencers
    from matcher import match_influencers

    product = "Handmade Terracotta Vase"

    analysis = analyze_product(
        product,
        800,
        "Eco-friendly handmade pottery"
    )

    matches = match_influencers(
        analysis,
        get_influencers()
    )

    best = matches[0]

    message = generate_outreach(
        product,
        analysis,
        best,
        15
    )

    print("\nGenerated Message:\n")
    print(message)