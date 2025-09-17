import { useState, useEffect } from 'react'
import HowItWorks from './HowItWorks'
import LivePriceAlerts from './LivePriceAlerts'
import SignUp from './SignUp'

// Burger Menu Component
function BurgerMenu({ currentPage, onNavigate, isOpen, onToggle }) {
  return (
    <>
      {/* Burger Button */}
      <button
        onClick={onToggle}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black z-40"
            onClick={onToggle}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          ></div>
          
          {/* Menu Panel */}
          <div 
            className="fixed top-0 right-0 h-full w-72 max-w-[80vw] shadow-2xl transform transition-transform duration-300 ease-in-out z-50"
            style={{ 
              backgroundColor: 'white', 
              opacity: 1,
              borderLeft: '1px solid #e5e7eb'
            }}
          >
            <div 
              className="flex flex-col h-full"
              style={{ backgroundColor: 'white' }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-6 border-b border-gray-200"
                style={{ backgroundColor: 'white' }}
              >
                <h2 className="text-xl font-medium text-gray-900">Menu</h2>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav 
                className="flex-1 p-6"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="space-y-1"
                  style={{ backgroundColor: 'white' }}
                >
                  <button
                    onClick={() => {
                      onNavigate('home');
                      onToggle();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      currentPage === 'home' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Home
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate('how-it-works');
                      onToggle();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      currentPage === 'how-it-works' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    How it Works
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate('live-price-alerts');
                      onToggle();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      currentPage === 'live-price-alerts' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Live Price Alerts
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate('sign-up');
                      onToggle();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      currentPage === 'sign-up' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </nav>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [visibleFeatures, setVisibleFeatures] = useState(new Set())
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

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
      description: "Join our exclusive community of early adopters and deal hunters.",
      highlight: "exclusive community",
      image: "early-access"
    }
  ]

  // Scroll reveal effect for individual features
  useEffect(() => {
    const handleFeatureScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      const newVisibleFeatures = new Set()
      
      features.forEach((_, index) => {
        const element = document.getElementById(`feature-${index}`)
        if (element) {
          const elementTop = element.offsetTop
          const elementHeight = element.offsetHeight
          const elementCenter = elementTop + elementHeight / 2
          
          // Feature becomes visible when its center is in the viewport
          if (scrollPosition + windowHeight > elementCenter) {
            newVisibleFeatures.add(index)
          }
        }
      })
      
      setVisibleFeatures(newVisibleFeatures)
    }

    window.addEventListener('scroll', handleFeatureScroll)
    handleFeatureScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleFeatureScroll)
  }, [features.length])

  const getFeatureImage = (imageType) => {
    const baseClasses = "w-full h-[500px] rounded-xl transition-all duration-700 ease-out"
    
    switch(imageType) {
      case 'save-money':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Exclusive Deals</h3>
              <p className="text-gray-600 text-lg">Save up to 70% on your favourite brands</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Smart Alerts</h3>
              <p className="text-gray-600 text-lg">Never miss a deal again</p>
            </div>
          </div>
        );
      case 'early-access':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Early Access</h3>
              <p className="text-gray-600 text-lg">Be the first to know about new deals</p>
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')} className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentPage('how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">How it Works</button>
              <button onClick={() => setCurrentPage('live-price-alerts')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Live Price Alerts</button>
              <button onClick={() => setCurrentPage('sign-up')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <BurgerMenu 
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isOpen={isBurgerMenuOpen}
                onToggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/blur-hero-background.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 lg:px-8 max-w-4xl mx-auto pt-20">
            {/* Small Label */}
            <div className="mb-8">
              <span className="inline-block bg-white/90 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                Free to Join
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
              Never Miss
              <br />
              <span className="text-gray-200">Out Again</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Discover amazing deals, limited-time offers, and exclusive opportunities before they disappear forever. Join our community of smart shoppers who never miss the best deals.
            </p>

            {/* CTA Button */}
            <div className="mb-20">
              <button 
                onClick={() => setCurrentPage('sign-up')} 
                className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-4 px-8 transition-all duration-200 text-lg rounded-lg hover:shadow-lg"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                id={`feature-${index}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out ${
                  visibleFeatures.has(index)
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-30 transform translate-y-8'
                }`}
              >
                {/* Left Column - Text Content */}
                <div className="flex items-start space-x-6">
                  {/* Feature Number */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-900 text-white">
                    <span className="text-lg font-medium">{feature.number}</span>
                  </div>
                  
                  {/* Feature Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium mb-4 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {feature.description.split(feature.highlight).map((part, partIndex) => (
                        <span key={partIndex}>
                          {part}
                          {partIndex < feature.description.split(feature.highlight).length - 1 && (
                            <span className="font-medium text-gray-900">
                              {feature.highlight}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div>
                  {getFeatureImage(feature.image)}
                </div>
              </div>
            ))}
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