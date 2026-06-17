from pydantic import BaseModel

# --- Schemas ---
# Schemas (using Pydantic) are used to validate the data coming IN from the frontend 
# and the data going OUT from the backend. This ensures we don't crash if bad data is sent.

# This schema expects the exact fields shown in your UI mockup.
class ProfitCalculatorRequest(BaseModel):
    product_price: float
    shipping_cost: float
    platform_fee: float
    commission_percent: float

# This schema is what we will send back to the frontend.
class ProfitCalculatorResponse(BaseModel):
    artisan_earnings: float
