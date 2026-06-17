from sqlalchemy import Column, Integer, String, Float
from database import Base

# --- Database Models ---
# A Model represents a Table in our database. 
# Each class attribute represents a Column in that table.

class Influencer(Base):
    __tablename__ = "influencers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    niche = Column(String)  # e.g., "Sustainability", "Home Decor"
    followers = Column(Integer)
    engagement_rate = Column(Float) # e.g., 5.4 for 5.4%
    platform = Column(String, default="Instagram")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String) # e.g., "Handmade Products"
    price = Column(Float)
    description = Column(String)

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer) # Links to Product.id
    influencer_id = Column(Integer) # Links to Influencer.id
    expected_reach = Column(Integer)
    predicted_ctr = Column(Float)
    affiliate_link = Column(String, unique=True, index=True) # The unique tracking link
    clicks = Column(Integer, default=0) # We will update this when someone clicks
