function HowItWorks({ onNavigate }) {
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
              <span className="text-sm font-medium text-gray-900 transition-colors uppercase tracking-wide">How it Works</span>
              <button onClick={() => onNavigate('live-price-alerts')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">Live Price Alerts</button>
              <a href="#signup" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide">Sign Up</a>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how GoingGone helps you never miss out on the best deals with our intelligent price tracking system.
          </p>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">We Track Everything</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We monitor thousands of websites and update every hour to detect price reductions. Our advanced algorithms scan for the best deals across your favourite brands and retailers, ensuring you never miss a price drop.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Website Tracking Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Create Your Alerts</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Log in and create your account to set up custom alerts and filters. Specify your favourite brands, price thresholds, and product categories to ensure you only get notified about deals that matter to you.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Custom Alerts Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Get Instant Notifications</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  When a product or brand drops to your target price, you'll receive instant notifications via WhatsApp or email. Never miss a deal again with our real-time alert system that works 24/7.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Notifications Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-orange-600">4</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Manage Your Alerts</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  All your alerts are organised in a dedicated section on your profile. Browse, edit, or pause your alerts at any time. Keep track of your saved deals and manage your preferences with ease.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Profile Management Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-red-600">5</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Shop & Save</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Click through to the retailer and purchase with ease. Our direct links take you straight to the discounted product, making your shopping experience seamless and efficient.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Shopping Image</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Ready to Never Miss Out Again?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of smart shoppers who save money with GoingGone's intelligent price tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('live-price-alerts')} className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-8 transition-colors text-lg">
              Preview Notifications
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-8 transition-colors text-lg border border-gray-300">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
