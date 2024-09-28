"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react";

export default function ResultsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('fitScore');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    // Fetch real products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Replace with your actual API endpoint, e.g., '/api/products' or the Groq AI API endpoint
        const response = await fetch('/api/products', {
          method: 'GET', // Use 'POST' if your API requires a POST request with parameters
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_GROQ_API_KEY` // If using Groq API, include the API key
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products. Please try again.');
        }

        const data = await response.json();
        setProducts(data.products); // Assuming the API returns a list of products
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Add dependencies here if the API call depends on user input, e.g., productType, budget

  const sortProducts = (a: any, b: any) => {
    if (sortOption === 'fitScore') return b.fitScore - a.fitScore;
    if (sortOption === 'priceLow') return a.price - b.price;
    if (sortOption === 'priceHigh') return b.price - a.price;
    return 0;
  };

  const filterProducts = (product: any) => {
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  };

  const filteredAndSortedProducts = products
    .filter(filterProducts)
    .sort(sortProducts);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Product Results</h1>
        <div className="flex justify-between items-center">
          <p>{filteredAndSortedProducts.length} products found</p>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="fitScore">Best Fit</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <Label htmlFor="priceRange">Price Range</Label>
                <Slider
                  id="priceRange"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Features</Label>
                {['Battery Life', 'Camera', 'Storage', 'Performance'].map((feature) => (
                  <div key={feature} className="flex items-center mb-2">
                    <Checkbox
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFeatures([...selectedFeatures, feature]);
                        } else {
                          setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                        }
                      }}
                    />
                    <Label htmlFor={feature} className="ml-2">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Fit Score: {product.fitScore}
            </span>
          </div>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Pros & Cons</h4>
            <ul className="space-y-1">
              {product.pros.slice(0, expanded ? undefined : 2).map((pro: string, index: number) => (
                <li key={`pro-${index}`} className="flex items-center text-green-600">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {pro}
                </li>
              ))}
              {product.cons.slice(0, expanded ? undefined : 2).map((con: string, index: number) => (
                <li key={`con-${index}`} className="flex items-center text-red-600">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
