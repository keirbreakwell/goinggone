import { useState } from 'react'
import HowItWorks from './HowItWorks'
import LivePriceAlerts from './LivePriceAlerts'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'how-it-works':
        return <HowItWorks onNavigate={setCurrentPage} />
      case 'live-price-alerts':
        return <LivePriceAlerts onNavigate={setCurrentPage} />
      default:
        return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')} className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentPage('how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">How it Works</button>
              <button onClick={() => setCurrentPage('live-price-alerts')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">Live Price Alerts</button>
              <a href="#signup" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">Sign Up</a>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="flex min-h-screen">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 lg:px-12 py-20">
          <div className="max-w-lg">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <span className="text-sm text-gray-500">Home / GoingGone</span>
            </nav>
            
            {/* Main Title */}
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              Never Miss Out Again
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              GoingGone helps you discover amazing deals, limited-time offers, and exclusive opportunities before they disappear forever. Join our community of smart shoppers who never miss the best deals.
            </p>
            
            {/* CTA Button */}
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-8 transition-colors text-lg">
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="w-full lg:w-1/2 bg-gray-100 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Placeholder for hero image */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Hero Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Save Money Card */}
            <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SAVE MONEY</h3>
                
                {/* Placeholder Image */}
                <div className="bg-gray-100 h-64 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Save Money Image</p>
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-gray-900 mb-2">Exclusive Deals</div>
                <div className="text-sm text-gray-600 mb-4">Available now</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover exclusive deals and discounts that are only available for a limited time. Our platform aggregates the best offers from trusted retailers.
                </p>
              </div>
            </div>

            {/* Don't Miss Out Card */}
            <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">DON'T MISS OUT</h3>
                
                {/* Placeholder Image */}
                <div className="bg-gray-100 h-64 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Notifications Image</p>
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-gray-900 mb-2">Smart Alerts</div>
                <div className="text-sm text-gray-600 mb-4">Instant notifications</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get instant notifications about flash sales, limited edition releases, and time-sensitive offers. Our smart alert system ensures you're always the first to know.
                </p>
              </div>
            </div>

            {/* Be the First Card */}
            <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">BE THE FIRST</h3>
                
                {/* Placeholder Image */}
                <div className="bg-gray-100 h-64 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Early Access Image</p>
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-gray-900 mb-2">Exclusive Access</div>
                <div className="text-sm text-gray-600 mb-4">Priority membership</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Join our exclusive community of early adopters and deal hunters. Get priority access to new features, beta testing opportunities, and insider information.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
        )
    }
  }

  return renderPage()
}

export default App