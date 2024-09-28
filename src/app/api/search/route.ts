import { NextResponse } from 'next/server';

// Simulated product database (in a real scenario, this would be replaced with a database call)
const mockProducts = [
  { id: 1, name: 'Laptop X', price: 999, features: ['battery', 'performance'] },
  { id: 2, name: 'Smartphone Y', price: 699, features: ['camera', 'battery'] },
  { id: 3, name: 'Tablet Z', price: 499, features: ['storage', 'screen'] },
];

// Helper function to simulate product search
const searchProducts = (productType: string, budget: number[], selectedFeatures: string[]) => {
  return mockProducts.filter(product => {
    // Check product type and budget
    const matchesType = product.name.toLowerCase().includes(productType.toLowerCase());
    const withinBudget = product.price >= budget[0] && product.price <= budget[1];

    // Check if at least one of the selected features matches
    const matchesFeatures = selectedFeatures.some(feature => product.features.includes(feature));

    return matchesType && withinBudget && matchesFeatures;
  });
};

// The main API route handler
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { productType, budget, selectedFeatures } = await request.json();

    // Perform the product search
    const results = searchProducts(productType, budget, selectedFeatures);

    // Return the results as a JSON response
    return NextResponse.json({ success: true, products: results });
  } catch (error) {
    console.error('Error handling search request:', error);
    return NextResponse.json({ success: false, message: 'Failed to process the request.' }, { status: 500 });
  }
}
