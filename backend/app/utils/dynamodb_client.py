import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table_name = 'ProductSearchCache'  # Replace with your table name

def cache_user_input(user_input: dict) -> None:
    """
    Stores user input in DynamoDB.
    """
    try:
        table = dynamodb.Table(table_name)
        table.put_item(Item=user_input)
    except ClientError as e:
        print(f"Failed to cache user input: {e.response['Error']['Message']}")

def get_cached_products(product_type: str, budget: int) -> list:
    """
    Retrieves cached products based on user input from DynamoDB.
    """
    try:
        table = dynamodb.Table(table_name)
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('product_type').eq(product_type) & 
                                   boto3.dynamodb.conditions.Key('budget').eq(budget)
        )
        return response.get('Items', [])
    except ClientError as e:
        print(f"Failed to retrieve cached products: {e.response['Error']['Message']}")
        return []
