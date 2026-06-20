from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

def generate_outreach(
    product_name,
    analysis,
    influencer,
    commission_pct=15
):
    if not client:
        return "Hi there! We'd love to collaborate with you on our latest campaign. Please check out the details!"
    
    interests = ", ".join(
        analysis.get("key_selling_points", ["general interests"])
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

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        print(f"Warning: Gemini API failed ({e}). Using fallback outreach message.")
        return f"Hi {influencer['name']},\n\nWe love your {influencer['niche']} content and think your audience would absolutely love our {product_name}. Our AI matching system identified you as an ideal partner!\n\nWe're offering a {commission_pct}% commission on all sales. Let us know if you're interested in collaborating!\n\nBest,\nThe Team"






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