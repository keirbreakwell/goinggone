import React, { useState, useEffect } from 'react';

function HowItWorks({ onNavigate }) {
  const [visibleSections, setVisibleSections] = useState(new Set());
  
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
      
      const newVisibleSections = new Set();
      
      steps.forEach((_, index) => {
        const element = document.getElementById(`step-${index}`);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const elementCenter = elementTop + elementHeight / 2;
          
          // Section becomes visible when its center is in the viewport
          if (scrollPosition + windowHeight > elementCenter) {
            newVisibleSections.add(index);
          }
        }
      });
      
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  const getImageComponent = (imageType) => {
    const baseClasses = "w-full h-[400px] rounded-xl transition-all duration-700 ease-out border border-gray-200";
    
    switch(imageType) {
      case 'tracking':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Website Monitoring</h3>
              <p className="text-gray-600 text-lg">Real-time price tracking across thousands of retailers</p>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Custom Alerts</h3>
              <p className="text-gray-600 text-lg">Personalised notifications for your favourite brands</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Instant Alerts</h3>
              <p className="text-gray-600 text-lg">Get notified the moment prices drop</p>
            </div>
          </div>
        );
      case 'management':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Profile Management</h3>
              <p className="text-gray-600 text-lg">Organise and control all your alerts</p>
            </div>
          </div>
        );
      case 'shopping':
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Seamless Shopping</h3>
              <p className="text-gray-600 text-lg">Direct links to discounted products</p>
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button onClick={() => onNavigate('home')} className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">GoingGone</button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-sm font-medium text-gray-900">How it Works</span>
              <button onClick={() => onNavigate('live-price-alerts')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Live Price Alerts</button>
              <button onClick={() => onNavigate('sign-up')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Sign Up</button>
            </nav>
            <div className="flex items-center">
              <a href="#account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Account</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how GoingGone helps you never miss out on the best deals with our intelligent price tracking system.
          </p>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                id={`step-${index}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out ${
                  visibleSections.has(index) 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-30 transform translate-y-8'
                }`}
              >
                {/* Left Column - Text Content */}
                <div className="flex items-start space-x-6">
                  {/* Step Number */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-900 text-white">
                    <span className="text-lg font-medium">{step.number}</span>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium mb-4 text-gray-900">
                      {step.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {step.description.split(step.highlight).map((part, partIndex) => (
                        <span key={partIndex}>
                          {part}
                          {partIndex < step.description.split(step.highlight).length - 1 && (
                            <span className="font-medium text-gray-900">
                              {step.highlight}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div>
                  {getImageComponent(step.image)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Ready to Never Miss Out Again?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money with GoingGone's intelligent price tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('live-price-alerts')} 
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-8 transition-all duration-200 text-lg rounded-lg hover:shadow-lg"
            >
              Preview Notifications
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

export default HowItWorks
