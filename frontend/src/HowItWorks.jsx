import { useState, useEffect } from 'react';

function HowItWorks({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      number: "01",
      title: "We Track Everything",
      description: "We monitor thousands of websites and update every hour to detect price reductions. Our advanced algorithms scan for the best deals across your favourite brands and retailers, ensuring you never miss a price drop.",
      highlight: "monitor thousands of websites",
      image: "tracking"
    },
    {
      number: "02", 
      title: "Create Your Alerts",
      description: "Log in and create your account to set up custom alerts and filters. Specify your favourite brands, price thresholds, and product categories to ensure you only get notified about deals that matter to you.",
      highlight: "custom alerts and filters",
      image: "alerts"
    },
    {
      number: "03",
      title: "Get Instant Notifications", 
      description: "When a product or brand drops to your target price, you'll receive instant notifications via WhatsApp or email. Never miss a deal again with our real-time alert system that works 24/7.",
      highlight: "instant notifications",
      image: "notifications"
    },
    {
      number: "04",
      title: "Manage Your Alerts",
      description: "All your alerts are organised in a dedicated section on your profile. Browse, edit, or pause your alerts at any time. Keep track of your saved deals and manage your preferences with ease.",
      highlight: "organised in a dedicated section",
      image: "management"
    },
    {
      number: "05",
      title: "Shop & Save",
      description: "Click through to the retailer and purchase with ease. Our direct links take you straight to the discounted product, making your shopping experience seamless and efficient.",
      highlight: "direct links take you straight",
      image: "shopping"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate which step should be active based on scroll position
      const scrollProgress = scrollPosition / (documentHeight - windowHeight);
      const newActiveStep = Math.min(Math.floor(scrollProgress * steps.length), steps.length - 1);
      
      setActiveStep(newActiveStep);
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  const getImageComponent = (imageType) => {
    const baseClasses = "w-full h-96 rounded-2xl transition-all duration-1000 ease-in-out";
    
    switch(imageType) {
      case 'tracking':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Website Monitoring</h3>
              <p className="text-gray-600">Real-time price tracking across thousands of retailers</p>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Alerts</h3>
              <p className="text-gray-600">Personalised notifications for your favourite brands</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-ping">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Alerts</h3>
              <p className="text-gray-600">Get notified the moment prices drop</p>
            </div>
          </div>
        );
      case 'management':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Management</h3>
              <p className="text-gray-600">Organise and control all your alerts</p>
            </div>
          </div>
        );
      case 'shopping':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center`}>
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Shopping</h3>
              <p className="text-gray-600">Direct links to discounted products</p>
            </div>
          </div>
        );
      default:
        return null;
    }
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
              <span className="text-sm font-light text-gray-900 transition-colors uppercase tracking-wide">How it Works</span>
              <button onClick={() => onNavigate('live-price-alerts')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide hover:underline">Live Price Alerts</button>
              <button onClick={() => onNavigate('sign-up')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide hover:underline">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Blur Effect 1 - Top Right */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-500/15 to-transparent rounded-full blur-3xl"></div>
          
          {/* Blur Effect 2 - Bottom Left */}
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-pink-400/15 via-violet-500/10 to-transparent rounded-full blur-2xl"></div>
          
          {/* Blur Effect 3 - Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-bl from-cyan-400/10 via-indigo-500/8 to-transparent rounded-full blur-3xl"></div>
          
          {/* Blur Effect 4 - Center Left */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/15 via-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-7xl lg:text-9xl font-riccione font-light text-white mb-8 leading-none tracking-wider">
            How It Works
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Discover how GoingGone helps you never miss out on the best deals with our intelligent price tracking system.
          </p>
        </div>
      </section>

      {/* Dynamic Process Flow */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-400/8 via-violet-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
            
            {/* Left Column - Text Content */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${
                    activeStep === index 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-30 transform translate-x-4'
                  }`}
                >
                  <div className="flex items-start space-x-8">
                    {/* Step Number */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeStep === index 
                        ? 'bg-gray-900 text-white scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <span className="text-2xl font-bold">{step.number}</span>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <h2 className={`text-3xl font-riccione font-bold mb-6 transition-colors duration-500 ${
                        activeStep === index ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h2>
                      <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                        activeStep === index ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {step.description.split(step.highlight).map((part, partIndex) => (
                          <span key={partIndex}>
                            {part}
                            {partIndex < step.description.split(step.highlight).length - 1 && (
                              <span className={`font-semibold transition-all duration-500 ${
                                activeStep === index 
                                  ? 'bg-yellow-200 text-gray-900 px-1 rounded' 
                                  : 'text-gray-400'
                              }`}>
                                {step.highlight}
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
                {getImageComponent(steps[activeStep].image)}
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-400/8 via-violet-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-riccione font-bold text-gray-900 mb-6">
            Ready to Never Miss Out Again?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of smart shoppers who save money with GoingGone's intelligent price tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('live-price-alerts')} className="bg-gray-900 hover:bg-gray-800 text-white font-light py-4 px-8 transition-colors text-lg tracking-wide">
              Preview Notifications
            </button>
            <button onClick={() => onNavigate('sign-up')} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900 font-light py-4 px-8 transition-colors text-lg border border-gray-300 tracking-wide">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
