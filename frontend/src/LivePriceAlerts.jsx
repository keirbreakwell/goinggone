import React, { useState, useEffect } from 'react';

function LivePriceAlerts({ onNavigate }) {
  // 🚀 TOGGLE FOR LIVE DEPLOYMENT: Set showComingSoon to false when API is ready
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Toggle for "COMING SOON" overlay - set to false when API is ready
  const [showComingSoon, setShowComingSoon] = useState(true);
  
  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/api/products?limit=100');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      
      // Fallback to mock data if API fails
      setProducts([
        {
          id: 1,
          name: "Nike Air Max 270",
          price: 89,
          discount: 41,
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
          brand: "Nike",
          retailer: "Nike Store"
        },
        {
          id: 2,
          name: "Levi's 501 Original Jeans",
          price: 59,
          discount: 40,
          imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
          brand: "Levi's",
          retailer: "Levi's Store"
        },
        {
          id: 3,
          name: "Adidas Ultraboost 22",
          price: 108,
          discount: 40,
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
          brand: "Adidas",
          retailer: "Adidas Store"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchProducts, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter products based on active filter (simplified for now - can be enhanced later)
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.brand.toLowerCase().includes(activeFilter.toLowerCase()));

  // Calculate original price from discount percentage
  const calculateOriginalPrice = (currentPrice, discountPercent) => {
    if (discountPercent <= 0) return currentPrice;
    return Math.round(currentPrice / (1 - discountPercent / 100));
  };

  // Format last updated time
  const formatLastUpdated = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button onClick={() => onNavigate('home')} className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => onNavigate('how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">How it Works</button>
              <span className="text-sm font-medium text-gray-900">Live Price Alerts</span>
              <button onClick={() => onNavigate('sign-up')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* COMING SOON Overlay */}
      {showComingSoon && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-12 max-w-md mx-6 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're currently setting up partnerships with retailers to bring you the best deals. 
              Live price alerts will be available soon!
            </p>
            <button 
              onClick={() => onNavigate('sign-up')} 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 transition-all duration-200 rounded-lg"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Live Price Alerts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Real-time deals and discounts from your favourite brands. Only showing products with 50%+ discounts.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span>{loading ? 'Loading...' : 'Live Updates'}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>{filteredProducts.length} Active Alerts</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>50%+ Discounts Only</span>
            </div>
            {lastUpdated && (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                <span>Updated {formatLastUpdated(lastUpdated)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === 'All'
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Products
            </button>
            {/* Dynamic brand filters based on available products */}
            {Array.from(new Set(products.map(p => p.brand))).slice(0, 5).map(brand => (
              <button
                key={brand}
                onClick={() => setActiveFilter(brand)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === brand
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Alerts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading products...</h3>
              <p className="text-gray-600">Fetching the latest deals for you.</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchProducts}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
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
              {filteredProducts.map((product) => {
                const originalPrice = calculateOriginalPrice(product.price, product.discount);
                const savings = originalPrice - product.price;
                
                return (
                  <div key={product.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden">
                    <div className="p-6">
                      {/* Product Image */}
                      <div className="h-64 mb-6 overflow-hidden rounded-lg">
                        <img 
                          src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">{product.brand} • {product.retailer}</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                      </div>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-gray-900">£{product.price.toFixed(2)}</span>
                          {product.discount > 0 && (
                            <>
                              <span className="text-lg text-gray-500 line-through">£{originalPrice.toFixed(2)}</span>
                              <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-lg">
                                {product.discount.toFixed(0)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            You save £{savings.toFixed(2)}
                          </div>
                        )}
                      </div>

                      {/* Shop Now Button */}
                      <a 
                        href={product.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 transition-all duration-200 block text-center rounded-lg hover:shadow-lg"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Want More Deals Like These?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create custom alerts for your favourite brands and never miss a deal again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-8 transition-all duration-200 text-lg rounded-lg hover:shadow-lg">
              Create Alert
            </button>
            <button 
              onClick={() => onNavigate('sign-up')} 
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-8 transition-all duration-200 text-lg border border-gray-300 rounded-lg hover:shadow-lg"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LivePriceAlerts