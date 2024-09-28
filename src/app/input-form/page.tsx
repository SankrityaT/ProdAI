"use client";

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const features = [
  { id: 'battery', label: 'Battery Life' },
  { id: 'screen', label: 'Screen Quality' },
  { id: 'storage', label: 'Storage' },
  { id: 'camera', label: 'Camera' },
  { id: 'performance', label: 'Performance' },
];

export default function ProductInputForm() {
  const [productType, setProductType] = useState('');
  const [budget, setBudget] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]); // State to store API results

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    setSelectedFeatures(prev =>
      checked ? [...prev, featureId] : prev.filter(id => id !== featureId)
    );
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productType.trim()) {
      newErrors.productType = 'Please specify a product type';
    }
    if (selectedFeatures.length === 0) {
      newErrors.features = 'Please select at least one feature';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    try {
      // Replace with your Groq AI API endpoint
      const response = await fetch('https://api.groq.com/v1/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_GROQ_API_KEY`, // Use your Groq API key here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productType, 
          budget, 
          selectedFeatures 
        }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        setResults(result.products); // Store the API response in results state
      } else {
        throw new Error(result.message || 'An error occurred while fetching products.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to fetch products. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5] text-gray-800">
      <div className="max-w-lg w-full">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#004080]">Find Your Perfect Product</h2>
          
          <div className="mb-6">
            <Label htmlFor="productType" className="block mb-2 text-sm font-medium text-gray-700">
              Product Type
            </Label>
            <Input
              id="productType"
              type="text"
              placeholder="e.g., laptop, smartphone"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className={`w-full ${errors.productType ? 'border-red-500' : ''}`}
              aria-invalid={errors.productType ? 'true' : 'false'}
              aria-describedby={errors.productType ? 'productType-error' : undefined}
            />
            {errors.productType && (
              <p id="productType-error" className="mt-1 text-xs text-red-500">
                {errors.productType}
              </p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-700">
              Budget Range
            </Label>
            <Slider
              id="budget"
              min={0}
              max={2000}
              step={50}
              value={budget}
              onValueChange={setBudget}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${budget[0]}</span>
              <span>${budget[1]}</span>
            </div>
          </div>

          <div className="mb-6">
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Key Features
            </Label>
            <div className="space-y-2">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                  />
                  <Label
                    htmlFor={feature.id}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.features && (
              <p className="mt-1 text-xs text-red-500">{errors.features}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#004080] hover:bg-[#0086BA] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search Products'
            )}
          </Button>

          {errors.submit && (
            <p className="mt-4 text-center text-red-500">{errors.submit}</p>
          )}
        </form>

        {/* Render the results */}
        <div className="results">
          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Results:</h3>
              <ul className="space-y-4">
                {results.map((product, index) => (
                  <li key={index} className="border-b pb-4">
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Fit Score: {product.fitScore}</p>
                    <p className="text-gray-600">Pros: {product.pros.join(', ')}</p>
                    <p className="text-gray-600">Cons: {product.cons.join(', ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
