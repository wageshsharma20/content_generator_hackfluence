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

