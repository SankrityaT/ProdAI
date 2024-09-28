import boto3

def generate_fit_score(product_details, user_input):
    # Create a payload for Bedrock with product details and user input
    payload = {
        'product': product_details,
        'user_preferences': user_input
    }
    
    # Interact with Amazon Bedrock
    client = boto3.client('bedrock')
    response = client.invoke_model(
        ModelId='fit-score-generator',
        ContentType='application/json',
        Payload=json.dumps(payload)
    )
    
    result = json.loads(response['Payload'].read())
    return result['fit_score'], result['explanation'], result['pros'], result['cons']
# import json

# # Initialize the Bedrock client
# client = boto3.client(
#     service_name='bedrock',
#     region_name='us-west-2'  # Change the region if necessary
# )

# # Define the prompt
# prompt = "What is the capital city of India?"

# # Make the request to the Titan model
# response = client.invoke_model(
#     modelId='amazon.titan-embed-text-v1',
#     contentType='application/json',
#     accept='/',
#     body=json.dumps({"inputText": prompt})
# )

# # Parse the response
# result = json.loads(response['body'])

# # Output the response
# print(result)