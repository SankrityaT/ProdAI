from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq_service import analyze_product  # Import the Groq AI service

router = APIRouter()

class UserInput(BaseModel):
    product_details: str
    user_preferences: str

@router.post("/fit-score")
async def fit_score(input_data: UserInput):
    try:
        # Call the Groq AI service to analyze the product
        result = analyze_product(input_data.product_details, input_data.user_preferences)

        # Check if there's an error in the response
        if 'error' in result:
            raise Exception(result['error'])
        
        return {"analysis_result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
