from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    name: str
    price: float
    fitScore: float = None
    scoreExplanation: str = None
    pros: List[str] = []
    cons: List[str] = []
