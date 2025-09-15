import { useState, useEffect } from 'react'
import HowItWorks from './HowItWorks'
import LivePriceAlerts from './LivePriceAlerts'
import SignUp from './SignUp'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      number: "01",
      title: "Save Money",
      description: "Discover exclusive deals and discounts that are only available for a limited time. Our platform aggregates the best offers from trusted retailers.",
      highlight: "exclusive deals and discounts",
      image: "save-money"
    },
    {
      number: "02", 
      title: "Don't Miss Out",
      description: "Get instant notifications about flash sales, limited edition releases, and time-sensitive offers. Our smart alert system ensures you're always the first to know.",
      highlight: "instant notifications",
      image: "notifications"
    },
    {
      number: "03",
      title: "Be the First", 
      description: "Join our exclusive community of early adopters and deal hunters. Get priority access to new features, beta testing opportunities, and insider information.",
      highlight: "exclusive community",
      image: "early-access"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features')
      if (!featuresSection) return
      
      const rect = featuresSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Much more generous scroll detection - trigger when section is visible at all
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate scroll progress through the entire section
        const sectionTop = rect.top
        const sectionHeight = rect.height
        const viewportCenter = windowHeight * 0.5
        
        // Calculate how far through the section we've scrolled
        const scrollProgress = Math.max(0, Math.min(1, (viewportCenter - sectionTop) / (sectionHeight * 0.6)))
        const newActiveFeature = Math.min(Math.floor(scrollProgress * features.length), features.length - 1)
        setActiveFeature(newActiveFeature)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [features.length])

  const getFeatureImage = (imageType) => {
    const baseClasses = "w-full h-[600px] rounded-2xl transition-all duration-1000 ease-in-out"
    
    switch(imageType) {
      case 'save-money':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exclusive Deals</h3>
              <p className="text-gray-600">Save up to 70% on your favourite brands</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Alerts</h3>
              <p className="text-gray-600">Never miss a deal again</p>
            </div>
          </div>
        );
      case 'early-access':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-ping">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Early Access</h3>
              <p className="text-gray-600">Be the first to know about new deals</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'how-it-works':
        return <HowItWorks onNavigate={setCurrentPage} />
      case 'live-price-alerts':
        return <LivePriceAlerts onNavigate={setCurrentPage} />
      case 'sign-up':
        return <SignUp onNavigate={setCurrentPage} />
      default:
        return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')} className="text-2xl font-riccione font-thin text-gray-900 hover:text-gray-700 transition-colors tracking-wide">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentPage('how-it-works')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider hover:underline">How it Works</button>
              <button onClick={() => setCurrentPage('live-price-alerts')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider hover:underline">Live Price Alerts</button>
              <button onClick={() => setCurrentPage('sign-up')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider hover:underline">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

        {/* Hero Section with Blur Effects */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with Gradient Blurs */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800">
            {/* Blur Effect 1 - Top Right */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/25 via-indigo-600/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Blur Effect 2 - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-600/20 via-blue-700/15 to-transparent rounded-full blur-3xl"></div>
            
            {/* Blur Effect 3 - Center Right */}
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-bl from-indigo-500/15 via-slate-600/10 to-transparent rounded-full blur-2xl"></div>
            
            {/* Blur Effect 4 - Center Left */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-700/20 via-slate-600/15 to-transparent rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto pt-20 flex flex-col justify-between min-h-screen">
            {/* Small Label */}
            <div className="pt-20">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-riccione font-light px-6 py-3 rounded-full border border-white/20 tracking-wide">
                Free to Join
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Main Title */}
              <h1 className="text-5xl lg:text-7xl font-riccione font-light text-white mb-8 leading-tight tracking-wider">
                Never Miss
                <br />
                <span className="italic font-light">Out Again</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Discover amazing deals, limited-time offers, and exclusive opportunities before they disappear forever. Join our community of smart shoppers who never miss the best deals.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pb-20">
              <button onClick={() => setCurrentPage('sign-up')} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-riccione font-light py-4 px-10 transition-all duration-300 text-lg rounded-full border border-white/20 hover:border-white/40 tracking-wide">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

      {/* Dynamic Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden min-h-screen">
        {/* Background Blur Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-400/8 via-violet-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
            
            {/* Left Column - Text Content */}
            <div className="space-y-24">
              <div className="text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl font-riccione font-bold text-gray-900 mb-6">
                  How it works
                </h2>
              </div>
              
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${
                    activeFeature === index 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-30 transform translate-x-4'
                  }`}
                >
                  <div className="flex items-start space-x-8">
                    {/* Feature Number */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeFeature === index 
                        ? 'bg-gray-900 text-white scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <span className="text-2xl font-bold">{feature.number}</span>
                    </div>
                    
                    {/* Feature Content */}
                    <div className="flex-1">
                      <h3 className={`text-3xl font-riccione font-bold mb-6 transition-colors duration-500 ${
                        activeFeature === index ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                        activeFeature === index ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.description.split(feature.highlight).map((part, partIndex) => (
                          <span key={partIndex}>
                            {part}
                            {partIndex < feature.description.split(feature.highlight).length - 1 && (
                              <span className={`font-semibold transition-all duration-500 ${
                                activeFeature === index 
                                  ? 'bg-yellow-200 text-gray-900 px-1 rounded' 
                                  : 'text-gray-400'
                              }`}>
                                {feature.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Dynamic Image */}
            <div className="relative">
              <div className="sticky top-32">
                {getFeatureImage(features[activeFeature].image)}
                
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