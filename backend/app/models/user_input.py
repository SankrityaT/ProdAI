from pydantic import BaseModel
from typing import List

class UserInput(BaseModel):
    product_type: str
    budget: int
    features: List[str]
