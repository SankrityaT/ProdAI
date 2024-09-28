"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ThumbsUp, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const scrollToSearch = () => {
    const searchForm = document.getElementById('product-search-form');
    if (searchForm) {
      searchForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-[#004080] text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Prodigi</Link>
          <Button variant="ghost" className="text-white hover:text-[#00A8E8]">About</Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#004080] text-white py-20 px-4">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your AI Product Research Assistant</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Get personalized product recommendations, detailed reviews, and quick pros and cons to make shopping easy.
            </p>
            <Button 
              onClick={scrollToSearch}
              className="bg-[#00A8E8] hover:bg-[#0086BA] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Start Your Search Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image
            src="/image.png?height=400&width=800"
            alt="AI Assistant and Products"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            priority
          />
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Search, title: "Input Your Needs", description: "Specify your product criteria and preferences." },
                { icon: BarChart3, title: "Get Personalized Scores", description: "Receive contextual 'Fit Scores' based on your input." },
                { icon: ThumbsUp, title: "Compare Products", description: "Review pros and cons summaries for informed decisions." }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full p-4 inline-block mb-4">
                    <step.icon className="h-12 w-12 text-[#004080]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Contextual Fit Score", description: "Get personalized product ratings based on your specific needs." },
                { title: "Detailed Pros and Cons", description: "Understand the strengths and weaknesses of each product at a glance." },
                { title: "Smart Product Comparisons", description: "Easily compare multiple products side by side." },
                { title: "Real-time Updates", description: "Access the latest product information and user reviews." },
                { title: "Customizable Filters", description: "Refine your search with advanced filtering options." },
                { title: "Save and Share", description: "Bookmark your favorite products and share them with friends." }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-[#004080] rounded-full p-2 mr-4">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#00A8E8] py-16 px-4 text-white text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to find your perfect product?</h2>
            <div className="flex justify-center space-x-4">
            <Link href="/input-form">
  <Button className="bg-white text-[#004080] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
    Input Form
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</Link>
<Link href="/result">
  <Button className="bg-white text-[#004080] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
    View Results
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</Link>

            </div>
          </div>
        </section>

        {/* Product Search Form Placeholder */}
        <section id="product-search-form" className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Product Search</h2>
            <p className="text-xl text-gray-600 mb-8">
              This is where the product search form will be implemented.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#004080] text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Prodigi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
