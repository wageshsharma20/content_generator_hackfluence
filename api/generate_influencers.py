import os
import random
import pandas as pd
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

# Recreate tables just in case
models.Base.metadata.create_all(bind=engine)

AUDIENCES = [
    "women 18-35", "men 18-35", "mixed 20-40", "families 30-50", 
    "women 25-45", "mixed 15-25", "men 25-45"
]

FIRST_NAMES = [
    "Priya", "Rahul", "Sarah", "Jay", "Aanya", "Rohan", "Maya", "Karan", 
    "Sneha", "Vikram", "Nina", "Amit", "Tara", "Ravi", "Elena", "Dev",
    "Chris", "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Sophia"
]

LAST_NAMES = [
    "Decor", "Tech", "Fitness", "Eats", "Styles", "Green", "Art", "Daily",
    "Guru", "Pro", "Magic", "Studio", "Vibes", "Diary", "Life", "World",
    "Review", "Trend", "Pulse", "Focus", "Vision", "Quest", "Craft"
]

def generate_influencers():
    db = SessionLocal()
    
    # We will reset and replace existing influencers
    db.query(models.Influencer).delete()
    db.commit()
    
    print("Reading Kaggle dataset...")
    dataset_path = "/Users/wageshsharma/.cache/kagglehub/datasets/tfisthis/influencer-marketing-roi-dataset/versions/1/influencer_marketing_roi_dataset.csv"
    
    if not os.path.exists(dataset_path):
        print(f"Error: Dataset not found at {dataset_path}")
        return
        
    df = pd.read_csv(dataset_path)
    
    # We will sample 1000 influencers from the dataset
    df_sample = df.sample(n=min(1000, len(df)), random_state=42)
    
    print("Generating and inserting influencers into SQLite...")
    for index, row in df_sample.iterrows():
        niche = row.get("influencer_category", "General")
        
        # Use estimated_reach as the follower count, ensuring a minimum bound
        followers = max(int(row.get("estimated_reach", random.randint(10000, 1000000))), 5000)
        
        # Calculate genuine engagement rate: (engagements / reach) * 100
        engagements = max(int(row.get("engagements", 0)), 1)
        engagement_rate = (engagements / followers) * 100
        
        # Cap engagement realistically between 0.1% and 15%
        engagement_rate = min(max(round(engagement_rate, 2), 0.1), 15.0)
        
        name = f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)} {random.randint(1, 999)}"
        audience = random.choice(AUDIENCES)

        inf = models.Influencer(
            name=name,
            niche=niche,
            followers=followers,
            engagement=engagement_rate,
            audience=audience
        )
        db.add(inf)
    
    db.commit()
    print(f"Successfully generated 1000 Kaggle influencers! Total in DB: {db.query(models.Influencer).count()}")
    db.close()

if __name__ == "__main__":
    generate_influencers()
