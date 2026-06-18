from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db
import uuid

# Create all tables in the database (this is what creates the karigar.db file)
models.Base.metadata.create_all(bind=engine)

# Initialize the FastAPI application
app = FastAPI(title="KarigarConnect AI API")

# A simple "Route" or "Endpoint"
# Think of this like an address on the internet. When someone goes to the root address ("/"),
# the server will run this function and return the message.
@app.get("/")
def read_root():
    return {"message": "Welcome to the KarigarConnect AI Backend!"}

# Another simple endpoint to demonstrate how we can return different data
@app.get("/health")
def health_check():
    return {"status": "ok", "service": "online"}

# --- The Profit Calculator Endpoint ---
# We use @app.post because the frontend is "posting" data to us to calculate.
@app.post("/profit", response_model=schemas.ProfitCalculatorResponse)
def calculate_profit(request: schemas.ProfitCalculatorRequest):
    # 1. Calculate the commission amount based on the percentage
    commission_amount = request.product_price * (request.commission_percent / 100)
    
    # 2. Subtract all deductions from the original price
    net_earnings = request.product_price - request.shipping_cost - request.platform_fee - commission_amount
    
    # 3. Return the exact structure defined in our ProfitCalculatorResponse schema
    return {"artisan_earnings": round(net_earnings, 2)}

# --- Affiliate Link Generation ---
@app.post("/campaigns/create")
def create_campaign(product_id: int, influencer_id: int, db: Session = Depends(get_db)):
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
    
    return {
        "message": "Campaign Created!",
        "tracking_link": f"http://localhost:8000/buy/{unique_code}"
    }

# --- The Click Tracker ---
# When someone clicks the link, they visit this route.
@app.get("/buy/{tracking_code}")
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

@app.post("/matching")
def find_influencer_matches(product_id: int):
    # This is a placeholder! 
    # Your friend will replace this with their actual Scikit-learn KNN model.
    # We are returning dummy data that matches the exact structure your UI needs.
    return {
        "matches": [
            {
                "influencer_name": "Urban Handmade",
                "match_score": 88,
                "niche": "Traditional Crafts",
                "followers": 45000,
                "tags": ["Home Decor", "Sustainability", "Lifestyle"]
            },
            {
                "influencer_name": "Eco Home Studio",
                "match_score": 86,
                "niche": "Interior Design",
                "followers": 95000,
                "tags": ["Home Decor", "Sustainability", "Lifestyle"]
            }
        ]
    }

@app.post("/prediction")
def get_campaign_prediction(product_id: int, influencer_id: int):
    # This is a placeholder for your friend's Logistic Regression model!
    # It sends back the exact data your dashboard expects.
    return {
        "expected_reach": "145K",
        "predicted_ctr": 3.4,
        "expected_orders": 61,
        "revenue": 48800,
        "net_profit": 31000,
        "ai_confidence_score": 92
    }


# --- PHASE 2: DASHBOARD INTEGRATION ENDPOINTS ---

@app.get("/analytics/revenue")
def get_revenue_graph():
    """Returns month-by-month dummy revenue data for the chart."""
    return {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "data": [42000, 58000, 75000, 92000, 110000, 150000] # Increasing revenue
    }

@app.get("/analytics/impact")
def get_impact_stats():
    """Returns overall platform impact stats."""
    return {
        "revenue_generated": "₹12.5L",
        "families_supported": "850+",
        "active_campaigns": 142
    }

@app.get("/campaigns/recent")
def get_recent_campaigns():
    """Returns a list of recent campaigns for the dashboard."""
    return [
        {"id": 1, "product": "Organic Clay Vase", "status": "Active", "influencers": 12, "roi": "+140%"},
        {"id": 2, "product": "Handloom Silk Saree", "status": "Completed", "influencers": 8, "roi": "+210%"},
        {"id": 3, "product": "Bamboo Desk Organizer", "status": "Active", "influencers": 25, "roi": "+85%"},
        {"id": 4, "product": "Terracotta Lamp", "status": "Draft", "influencers": 0, "roi": "N/A"},
        {"id": 5, "product": "Vegan Leather Wallet", "status": "Active", "influencers": 4, "roi": "+30%"}
    ]

@app.get("/products/featured")
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
