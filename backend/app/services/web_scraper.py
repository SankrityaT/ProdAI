import requests
from bs4 import BeautifulSoup

def fetch_product_data(product_type, budget):
    # Example: Scraping a website (e.g., Amazon)
    url = f"https://www.example.com/search?q={product_type}&max_price={budget}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    products = []
    for item in soup.select('.product-item'):  # Adjust this according to the site's HTML structure
        name = item.select_one('.product-title').text.strip()
        price = float(item.select_one('.product-price').text.strip().replace('$', ''))
        features = item.select_one('.product-features').text.strip().split(',')
        
        products.append({
            'name': name,
            'price': price,
            'features': features,
        })

    return products
