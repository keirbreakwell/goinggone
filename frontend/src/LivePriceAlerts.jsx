import React, { useState } from 'react';

function LivePriceAlerts({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Mock data for product alerts
  const productAlerts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      originalPrice: 150,
      discountedPrice: 89,
      discount: 41,
      image: "nike-shoes",
      brand: "Nike",
      category: "Shoes",
      gender: "Men's"
    },
    {
      id: 2,
      name: "Levi's 501 Original Jeans",
      originalPrice: 98,
      discountedPrice: 59,
      discount: 40,
      image: "jeans",
      brand: "Levi's",
      category: "Clothing",
      gender: "Men's"
    },
    {
      id: 3,
      name: "Adidas Ultraboost 22",
      originalPrice: 180,
      discountedPrice: 108,
      discount: 40,
      image: "adidas-shoes",
      brand: "Adidas",
      category: "Shoes",
      gender: "Women's"
    },
    {
      id: 4,
      name: "Nike Kids Air Max 270",
      originalPrice: 80,
      discountedPrice: 45,
      discount: 44,
      image: "kids-nike-shoes",
      brand: "Nike",
      category: "Shoes",
      gender: "Children's"
    },
    {
      id: 5,
      name: "Adidas Kids Ultraboost 22",
      originalPrice: 90,
      discountedPrice: 54,
      discount: 40,
      image: "kids-adidas-shoes",
      brand: "Adidas",
      category: "Shoes",
      gender: "Children's"
    }
  ]

  // Filter products based on active filter
  const filteredProducts = activeFilter === 'All' 
    ? productAlerts 
    : productAlerts.filter(product => product.gender === activeFilter);

  // Function to generate product images
  const getProductImage = (product) => {
    const imageMap = {
      'nike-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
      'jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center',
      'adidas-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
      'kids-nike-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
      'kids-adidas-shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center'
    };
    
    return imageMap[product.image] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button onClick={() => onNavigate('home')} className="text-2xl font-riccione font-thin text-gray-900 hover:text-gray-700 transition-colors tracking-wider">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => onNavigate('how-it-works')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide hover:underline">How it Works</button>
              <span className="text-sm font-light text-gray-900 transition-colors uppercase tracking-wide">Live Price Alerts</span>
              <button onClick={() => onNavigate('sign-up')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide hover:underline">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-riccione font-light text-gray-900 mb-6">
            Live Price Alerts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Real-time deals and discounts from your favourite brands. Never miss out on the best prices again.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Live Updates</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>{filteredProducts.length} Active Alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveFilter("Men's")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Men's"
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setActiveFilter("Women's")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Women's"
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Women's
            </button>
            <button
              onClick={() => setActiveFilter("Children's")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Children's"
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Children's
            </button>
            <button
              onClick={() => setActiveFilter("Unisex")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Unisex"
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unisex
            </button>
          </div>
        </div>
      </section>

      {/* Product Alerts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filter to see more products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    {/* Product Image */}
                    <div className="h-64 mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={getProductImage(product)} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">{product.brand} • {product.category} • {product.gender}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl font-bold text-gray-900">£{product.discountedPrice}</span>
                        <span className="text-lg text-gray-500 line-through">£{product.originalPrice}</span>
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                          {product.discount}% OFF
                        </span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        You save £{product.originalPrice - product.discountedPrice}
                      </div>
                    </div>

                    {/* Shop Now Button */}
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-riccione font-bold text-gray-900 mb-4">
            Want More Deals Like These?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Create custom alerts for your favourite brands and never miss a deal again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-light py-3 px-6 transition-colors tracking-wide">
              Create Alert
            </button>
            <button onClick={() => onNavigate('sign-up')} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900 font-light py-3 px-6 transition-colors border border-gray-300 tracking-wide">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LivePriceAlerts