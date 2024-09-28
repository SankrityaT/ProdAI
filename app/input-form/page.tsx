"use client"

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Loader2, Search, DollarSign, List, Info, Star } from "lucide-react"
import * as Slider from '@radix-ui/react-slider'

const features = [
  { id: 'battery', label: 'Battery Life', icon: '🔋', description: 'Longer battery life for extended use' },
  { id: 'screen', label: 'Screen Quality', icon: '📺', description: 'High-resolution display for crisp visuals' },
  { id: 'storage', label: 'Storage', icon: '💾', description: 'Ample space for all your files and apps' },
  { id: 'camera', label: 'Camera', icon: '📷', description: 'Advanced camera system for stunning photos' },
  { id: 'performance', label: 'Performance', icon: '⚡', description: 'Powerful processor for smooth operation' },
]

export default function ProductInputForm() {
  const [productType, setProductType] = useState('')
  const [budget, setBudget] = useState([500, 1500])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    setSelectedFeatures(prev =>
      checked ? [...prev, featureId] : prev.filter(id => id !== featureId)
    )
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!productType.trim()) {
      newErrors.productType = 'Please specify a product type'
    }
    if (selectedFeatures.length === 0) {
      newErrors.features = 'Please select at least one feature'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResults([
        { name: "Product 1", price: 999, fitScore: 0.95, pros: ["Great battery", "High performance"], cons: ["Expensive"] },
        { name: "Product 2", price: 799, fitScore: 0.85, pros: ["Good value", "Nice screen"], cons: ["Average camera"] },
      ])
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Failed to fetch products. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="backdrop-blur-md bg-white/90 shadow-xl border-0 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <CardTitle className="text-4xl font-bold text-center tracking-tight">Find Your Perfect Product</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full bg-blue-100 p-1">
                <TabsTrigger value="search" className="rounded-full text-sm font-medium transition-all duration-300">Search</TabsTrigger>
                <TabsTrigger value="results" className="rounded-full text-sm font-medium transition-all duration-300">Results</TabsTrigger>
              </TabsList>
              <TabsContent value="search">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Type Input */}
                  <div className="space-y-4">
                    <Label htmlFor="productType" className="text-sm font-medium text-gray-700">
                      Product Type
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="productType"
                        type="text"
                        placeholder="e.g., laptop, smartphone"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className={`pl-10 ${errors.productType ? 'border-red-500' : 'border-gray-300'} text-base rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        aria-invalid={errors.productType ? 'true' : 'false'}
                        aria-describedby={errors.productType ? 'productType-error' : undefined}
                      />
                    </div>
                    {errors.productType && (
                      <p id="productType-error" className="text-xs text-red-500 mt-1">{errors.productType}</p>
                    )}
                  </div>

                  {/* Budget Range Slider */}
                  <div className="space-y-4">
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                      Budget Range
                    </Label>
                    <div className="relative pt-6">
                      <DollarSign className="absolute left-0 top-0 text-gray-400" />
                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={budget}
                        onValueChange={setBudget}
                        max={2000}
                        step={50}
                        aria-label="Budget"
                      >
                        <Slider.Track className="bg-blue-200 relative grow rounded-full h-2">
                          <Slider.Range className="absolute bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-full" />
                        </Slider.Track>
                        {budget.map((value, index) => (
                          <Slider.Thumb
                            key={index}
                            className="block w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-700 shadow-md rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            aria-label={index === 0 ? "Minimum budget" : "Maximum budget"}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="w-5 h-5" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>${value}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Slider.Thumb>
                        ))}
                      </Slider.Root>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>${budget[0]}</span>
                        <span>${budget[1]}</span>
                      </div>
                      <Progress
    value={(budget[1] - budget[0]) / 20} // Ensure the value is a percentage (0-100)
    className="w-full mt-2 bg-blue-200 h-2 rounded-full"
  >
    <div
      className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full"
      style={{ width: `${(budget[1] - budget[0]) / 20}%` }} // Calculate the width percentage
    />
  </Progress>
</div>
                  </div>

                  {/* Key Features Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Key Features
                    </Label>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="features">
                        <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 rounded-full px-6 py-3 text-gray-700 text-sm font-medium transition-all duration-300">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <List className="mr-2" />
                              Select features
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {features.map((feature) => (
                              <TooltipProvider key={feature.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center space-x-2 bg-white rounded-full p-3 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-300">
                                      <Checkbox
                                        id={feature.id}
                                        checked={selectedFeatures.includes(feature.id)}
                                        onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                                        className="rounded-full"
                                      />
                                      <Label htmlFor={feature.id} className="text-sm font-medium cursor-pointer">
                                        {feature.icon} {feature.label}
                                      </Label>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{feature.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {errors.features && (
                      <p className="text-xs text-red-500 mt-1">{errors.features}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search Products
                      </>
                    )}
                  </Button>

                  {errors.submit && (
                    <p className="text-center text-red-500 mt-4 text-sm">{errors.submit}</p>
                  )}
                </form>
              </TabsContent>
              <TabsContent value="results">
                <AnimatePresence>
                  {results.length > 0 ? (
                    <ul className="space-y-6">
                      {results.map((product, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">Price: ${product.price}</p>
                              <div className="flex items-center space-x-2 mb-4">
                                <Progress value={product.fitScore * 100} className="w-32" />
                                <span className="text-sm font-medium text-gray-700">
                                  Fit Score: {(product.fitScore * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                              Best Match
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Pros:</h5>
                            <div className="flex flex-wrap gap-2">
                              {product.pros.map((pro: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-1 rounded-full">
                                  {pro}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Cons:</h5>
                            <div className="flex flex-wrap gap-2">
                              {product.cons.map((con: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs px-2 py-1 rounded-full">
                                  {con}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center">
                            <Star className="text-yellow-400 w-5 h-5 mr-1" />
                            <span className="text-sm text-gray-600">4.5 (120 reviews)</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      No results yet. Start your search to see products here.
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center bg-gray-50 p-6">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <Info className="w-5 h-5 mr-2" />
                  How it works
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?text=AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Product Search Assistant</h3>
                    <p className="text-xs text-gray-500">
                      Our AI-powered search analyzes your preferences to find the best products that match your needs and budget. We consider factors like product type, budget, and key features to provide personalized recommendations.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}