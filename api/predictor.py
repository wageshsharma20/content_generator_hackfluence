import math

def predict_campaign(match_score, followers, engagement, price):
    # Logarithmic scaling for large Kaggle influencers
    # Example: 1,000,000 followers = log10(1,000,000) = 6
    follower_factor = math.log10(max(followers, 10))
    
    # 1. Base conversion probability driven by match score and engagement
    # Using a sigmoidal base but scaled to realistic e-commerce bounds
    z = -3 + 0.03 * match_score + 0.20 * min(engagement, 10)
    base_probability = 1 / (1 + math.exp(-z))
    
    # 2. Estimated reach (how many people actually see it)
    # Organic reach algorithms typically cap at around 5-15% for massive accounts
    reach_percentage = min((engagement / 100) * 2.5, 0.20)
    estimated_reach = int(followers * reach_percentage)
    
    # 3. Click-through rate (CTR)
    # Influenced strongly by match score (relevance)
    ctr = 0.01 + (match_score / 2000)
    clicks = int(estimated_reach * ctr)
    
    # 4. Conversion Rate (people who click -> buy)
    # Higher price items have lower conversion rates
    price_resistance = math.log10(max(price, 10)) / 10
    conversion_rate = max(base_probability * 0.10 - price_resistance, 0.005)
    
    orders = int(clicks * conversion_rate)
    revenue = orders * price
    
    # AI Confidence is tied to the base probability
    confidence = int(base_probability * 100)
    
    return {
        "expected_reach": estimated_reach,
        "predicted_ctr": round(ctr, 4),
        "expected_orders": orders,
        "revenue": round(revenue, 2),
        "net_profit": round(revenue * 0.1, 2),  # Assume 10% platform net profit
        "ai_confidence_score": confidence
    }

if __name__ == "__main__":
    result = predict_campaign(
        match_score=85,
        followers=1200000,  # Massive Kaggle influencer test
        engagement=4.8,
        price=800
    )
    print("\nCampaign Prediction\n")
    for key, value in result.items():
        print(f"{key}: {value}")