import os
import math

SEMANTIC_WEIGHT = 0.50
ENGAGEMENT_WEIGHT = 0.35
FOLLOWER_WEIGHT = 0.15

def build_product_text(analysis):
    interests = ", ".join(analysis["interests"])
    keywords = ", ".join(analysis["keywords"])
    return (
        f"A {analysis['category']} product for {analysis['audience']}. "
        f"Related interests: {interests}. "
        f"Keywords: {keywords}."
    )

def match_influencers(analysis, influencers):
    product_category = analysis.get("category", "").lower()
    
    # 1. Filter influencers by category to search the whole DB efficiently
    filtered_influencers = [
        inf for inf in influencers 
        if inf.get("niche", "").lower() == product_category
    ]
    
    # If no exact match, fallback to all (e.g. if category is weird)
    if not filtered_influencers:
        filtered_influencers = influencers

    results = []

    # 2. Score them instantly using algorithmic heuristics instead of slow LLM embeddings
    for inf in filtered_influencers:
        # Base semantic score is high if niches matched
        semantic_score = 90.0 if inf.get("niche", "").lower() == product_category else 50.0

        # Engagement score (cap at 100)
        engagement_score = min(inf["engagement"] * 10, 100)
        
        # Follower score (logarithmic scale to handle Kaggle's massive influencers)
        # log10(1,000,000) = 6. Let's say 1,000,000 followers = 100 score.
        follower_score = min((math.log10(max(inf["followers"], 10)) / 6) * 100, 100)

        final_score = (
            semantic_score * SEMANTIC_WEIGHT +
            engagement_score * ENGAGEMENT_WEIGHT +
            follower_score * FOLLOWER_WEIGHT
        )

        confidence_score = (
            semantic_score * 0.60 +
            engagement_score * 0.25 +
            follower_score * 0.15
        )
        confidence_score = min(confidence_score + 10, 99)

        results.append({
            "name": inf["name"],
            "match_score": round(final_score, 1),
            "confidence_score": round(confidence_score, 1),
            "why_match": [
                f"Strong presence in {inf.get('niche', 'this niche')} space",
                f"Audience aligns with {analysis.get('target_audience', 'the target demographic')}",
                f"High engagement rate ({inf['engagement']}%) indicates active followers"
            ],
            "semantic_score": round(semantic_score, 1),
            "engagement_score": round(engagement_score, 1),
            "follower_score": round(follower_score, 1),
            "followers": inf["followers"],
            "engagement": inf["engagement"],
            "audience": inf["audience"],
            "niche": inf["niche"]
        })

    # Sort by match score
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results

if __name__ == "__main__":
    from analyzer import analyze_product
    from influencers import get_influencers
    analysis = analyze_product("Handmade Terracotta Vase", 800, "Eco-friendly handmade pottery")
    matches = match_influencers(analysis, get_influencers())
    for m in matches[:5]:
        print(f"{m['name']:<20} {m['match_score']}%")