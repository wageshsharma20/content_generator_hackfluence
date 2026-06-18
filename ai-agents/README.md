AI Agents 
AI Agents Module
analyzer.py
  Uses Gemini AI to analyze product details.
  Extracts category, audience, interests, and keywords.
  Converts raw artisan data into structured metadata.
influencers.py
  Stores creator/influencer database.
  Contains niche, audience, followers, and engagement information.
  build_embeddings.py
  Generates creator embeddings using Sentence Transformers.
  Saves embeddings for reuse.
  Prevents repeated encoding of creator profiles.
influencer_embeddings.npy
  Stores cached creator embeddings.
  Used by the matching engine for fast recommendations.
matcher.py
  Core recommendation engine.
  Uses Sentence Transformers + KNN + Cosine Similarity.
  Finds the most relevant creators for a product.
  Generates Match Score and AI Confidence Score.
success_factors.py
  Explains campaign success probability.
  Calculates:
    Audience Match
    Engagement Strength
    Creator Reach
    Overall Confidence
commission.py
  Recommends affiliate commission percentage.
  Based on creator quality and campaign potential.
predictor.py
  Forecasts campaign performance.
  Predicts:
    Reach
    Clicks
    Orders
    Revenue
    Conversion Probability
outreach.py
  Generates personalized influencer outreach messages.
  Uses product details and creator profile context.
main.py
Runs the complete AI workflow.
Coordinates all AI agents and displays final results.
