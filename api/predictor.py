import math

def predict_campaign(match_score, followers, engagement, price):

    # Hardcoded logistic regression formula to replace sklearn
    z = -4 + 0.04 * match_score + 0.30 * engagement
    probability = 1 / (1 + math.exp(-z))

    estimated_reach = int(
        followers * (engagement / 100) * 8
    )

    ctr = 0.03 + (match_score / 1000)

    clicks = int(
        estimated_reach * ctr
    )

    conversion_rate = probability * 0.15

    orders = int(
        clicks * conversion_rate
    )

    revenue = orders * price

    return {
        "match_score": round(match_score, 1),
        "reach": estimated_reach,
        "clicks": clicks,
        "orders": orders,
        "revenue": revenue,
        "conversion_probability": round(
            probability * 100,
            1
        )
    }


if __name__ == "__main__":

    result = predict_campaign(
        match_score=85,
        followers=120000,
        engagement=4.8,
        price=800
    )

    print("\nCampaign Prediction\n")

    for key, value in result.items():
        print(f"{key}: {value}")