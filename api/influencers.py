from database import SessionLocal
import models

def get_influencers():
    db = SessionLocal()
    try:
        db_influencers = db.query(models.Influencer).all()
        result = []
        for inf in db_influencers:
            result.append({
                "id": inf.id,
                "name": inf.name,
                "niche": inf.niche,
                "followers": inf.followers,
                "engagement": inf.engagement,
                "audience": inf.audience
            })
        return result
    finally:
        db.close()