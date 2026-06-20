from pydantic import BaseModel
from typing import List, Optional

class MatchRequest(BaseModel):
    product_name: str
    price: float
    description: str
    image: Optional[str] = None

class MatchResult(BaseModel):
    influencer_name: str
    match_score: float
    followers: int
    engagement: float
    confidence_score: float
    recommended_commission: float
    why_match: List[str]
    niche: str = ""
    audience: str = "" 

class PredictionRequest(BaseModel):
    match_score: float
    followers: int
    engagement: float
    product_price: float

class PredictionResult(BaseModel):
    expected_reach: int
    predicted_ctr: float
    expected_orders: int
    revenue: float
    net_profit: float
    ai_confidence_score: int
