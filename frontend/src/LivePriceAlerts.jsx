function LivePriceAlerts({ onNavigate }) {
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
      name: "Apple AirPods Pro",
      originalPrice: 249,
      discountedPrice: 199,
      discount: 20,
      image: "airpods",
      brand: "Apple",
      category: "Electronics",
      gender: "Unisex"
    },
    {
      id: 3,
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
      id: 4,
      name: "Samsung Galaxy Watch",
      originalPrice: 299,
      discountedPrice: 199,
      discount: 33,
      image: "smartwatch",
      brand: "Samsung",
      category: "Electronics",
      gender: "Unisex"
    },
    {
      id: 5,
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
      id: 6,
      name: "MacBook Air M2",
      originalPrice: 1199,
      discountedPrice: 999,
      discount: 17,
      image: "macbook",
      brand: "Apple",
      category: "Electronics",
      gender: "Unisex"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button onClick={() => onNavigate('home')} className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => onNavigate('how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">How it Works</button>
              <span className="text-sm font-medium text-gray-900 transition-colors uppercase tracking-wide">Live Price Alerts</span>
              <a href="#signup" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">Sign Up</a>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Live Price Alerts
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Real-time deals and discounts from your favourite brands. Never miss out on the best prices again.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Live Updates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>6 Active Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Alerts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productAlerts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  {/* Product Image */}
                  <div className="bg-gray-100 h-64 mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">{product.image}</p>
                    </div>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Want More Deals Like These?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Create custom alerts for your favourite brands and never miss a deal again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 transition-colors">
              Create Alert
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 transition-colors border border-gray-300">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LivePriceAlerts
