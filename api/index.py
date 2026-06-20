import sys
import os
# Ensure the current directory is in sys.path so Vercel can find models.py
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db
import uuid

# Create all tables in the database (this is what creates the karigar.db file)
models.Base.metadata.create_all(bind=engine)

# Initialize the FastAPI application
app = FastAPI(title="KarigarConnect AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A simple "Route" or "Endpoint"
# Think of this like an address on the internet. When someone goes to the root address ("/"),
# the server will run this function and return the message.
@app.get("/")
def read_root():
    return {"message": "Welcome to the KarigarConnect AI Backend!"}

# Another simple endpoint to demonstrate how we can return different data
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "online"}

# --- The Profit Calculator Endpoint ---
# We use @app.post because the frontend is "posting" data to us to calculate.
@app.post("/api/profit", response_model=schemas.ProfitCalculatorResponse)
def calculate_profit(request: schemas.ProfitCalculatorRequest):
    # 1. Calculate the commission amount based on the percentage
    commission_amount = request.product_price * (request.commission_percent / 100)
    
    # 2. Subtract all deductions from the original price
    net_earnings = request.product_price - request.shipping_cost - request.platform_fee - commission_amount
    
    # 3. Return the exact structure defined in our ProfitCalculatorResponse schema
    return {"artisan_earnings": round(net_earnings, 2)}

# --- Affiliate Link Generation ---
@app.post("/api/campaigns/create")
def create_campaign(product_id: int, influencer_id: int, req: Request, db: Session = Depends(get_db)):
    # Generate a random 8-character string for our unique link
    unique_code = str(uuid.uuid4())[:8]
    
    # Save the new campaign to the database
    new_campaign = models.Campaign(
        product_id=product_id,
        influencer_id=influencer_id,
        affiliate_link=unique_code,
        clicks=0
    )
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    
    base_url = str(req.base_url).rstrip("/")
    return {
        "message": "Campaign Created!",
        "tracking_link": f"{base_url}/api/buy/{unique_code}"
    }

# --- The Click Tracker ---
# When someone clicks the link, they visit this route.
@app.get("/api/buy/{tracking_code}")
def track_click_and_redirect(tracking_code: str, db: Session = Depends(get_db)):
    # 1. Find the campaign with this unique code
    campaign = db.query(models.Campaign).filter(models.Campaign.affiliate_link == tracking_code).first()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Link not found")
        
    # 2. Log the click! This is the most important part of affiliate marketing.
    campaign.clicks += 1
    db.commit()
    
    # 3. Redirect the user to the actual product store page
    product_url = f"https://example.com/product/{campaign.product_id}"
    return RedirectResponse(url=product_url)


# --- ML / AI Integration Endpoints (Step 5) ---
import ml_schemas
from analyzer import analyze_product
from matcher import match_influencers
from influencers import get_influencers
from predictor import predict_campaign
from outreach import generate_outreach
from commission import recommend_commission

@app.post("/api/analyze")
def analyze(request: ml_schemas.MatchRequest):
    try:
        analysis = analyze_product(
            request.product_name,
            request.price,
            request.description,
            request.image
        )
        return analysis
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

@app.post("/api/matching", response_model=list[ml_schemas.MatchResult])
def find_influencer_matches(request: ml_schemas.MatchRequest):
    analysis = analyze_product(request.product_name, request.price, request.description, request.image)
    matches = match_influencers(analysis, get_influencers())
    
    results = []
    for m in matches[:3]:  # Return top 3 matches
        comm = recommend_commission(m)
        results.append({
            "influencer_name": m["name"],
            "match_score": m["match_score"],
            "followers": m["followers"],
            "engagement": m["engagement"],
            "confidence_score": m["confidence_score"],
            "recommended_commission": comm,
            "why_match": m["why_match"],
            "niche": m.get("niche", ""),
            "audience": m.get("audience", "")
        })
    return results

@app.post("/api/prediction", response_model=ml_schemas.PredictionResult)
def get_campaign_prediction(request: ml_schemas.PredictionRequest):
    forecast = predict_campaign(
        request.match_score, 
        request.followers, 
        request.engagement, 
        request.product_price
    )
    return forecast

@app.post("/api/outreach")
def get_outreach_message(request: ml_schemas.MatchRequest, influencer_name: str, commission: float):
    analysis = analyze_product(request.product_name, request.price, request.description, request.image)
    try:
        influencer_data = next(i for i in get_influencers() if i["name"] == influencer_name)
    except StopIteration:
        raise HTTPException(status_code=404, detail=f"Influencer '{influencer_name}' not found")
    
    # We need match score and other stuff that outreach might need, but we pass basic data 
    # as expected by generate_outreach
    message = generate_outreach(request.product_name, analysis, influencer_data, commission)
    return {"message": message}


# --- PHASE 2: DASHBOARD INTEGRATION ENDPOINTS ---

@app.get("/api/analytics/revenue")
def get_revenue_graph():
    """Returns month-by-month dummy revenue data for the chart."""
    return {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "data": [42000, 58000, 75000, 92000, 110000, 150000] # Increasing revenue
    }

@app.get("/api/analytics/impact")
def get_impact_stats():
    """Returns overall platform impact stats."""
    return {
        "revenue_generated": "₹12.5L",
        "families_supported": "850+",
        "active_campaigns": 142
    }

@app.get("/api/campaigns/recent")
def get_recent_campaigns():
    """Returns a list of recent campaigns for the dashboard."""
    return [
        {"id": 1, "product": "Organic Clay Vase", "status": "Active", "influencers": 12, "roi": "+140%"},
        {"id": 2, "product": "Handloom Silk Saree", "status": "Completed", "influencers": 8, "roi": "+210%"},
        {"id": 3, "product": "Bamboo Desk Organizer", "status": "Active", "influencers": 25, "roi": "+85%"},
        {"id": 4, "product": "Terracotta Lamp", "status": "Draft", "influencers": 0, "roi": "N/A"},
        {"id": 5, "product": "Vegan Leather Wallet", "status": "Active", "influencers": 4, "roi": "+30%"}
    ]

@app.get("/api/products/featured")
def get_featured_product():
    """Returns data for the primary featured product."""
    return {
        "id": 101,
        "name": "Artisan Crafted Clay Vase",
        "description": "Sustainable wood-fired organic earthy clay pottery vase made by the Kutch Cooperative.",
        "price": 800.00,
        "stock": 150,
        "image_url": "https://example.com/images/clay_vase.jpg"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)
