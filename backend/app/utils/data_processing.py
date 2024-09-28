from typing import List, Dict
from models.product import Product

def filter_products(products: List[Dict], product_type: str, budget: int) -> List[Dict]:
    """
    Filters the products based on the product type and budget.
    """
    return [
        product for product in products 
        if product_type.lower() in product['name'].lower() and product['price'] <= budget
    ]

def prepare_product_for_scoring(product: Dict, user_input: Dict) -> Dict:
    """
    Prepares the product details and user input for Amazon Bedrock scoring.
    """
    return {
        "product_details": {
            "name": product['name'],
            "price": product['price'],
            "features": product.get('features', [])
        },
        "user_preferences": user_input
    }

def process_bedrock_response(response: Dict, product: Dict) -> Product:
    """
    Processes the response from Amazon Bedrock and returns a Product model instance.
    """
    return Product(
        name=product['name'],
        price=product['price'],
        fitScore=response['fit_score'],
        scoreExplanation=response['explanation'],
        pros=response.get('pros', []),
        cons=response.get('cons', [])
    )
