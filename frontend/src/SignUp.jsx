import React, { useState } from 'react';

function SignUp({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    selectedBrands: [],
    otherBrand: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Popular brands for selection
  const popularBrands = [
    'Nike', 'Adidas', 'Apple', 'Samsung', 'Levi\'s', 'Zara', 'H&M', 'Uniqlo',
    'Amazon', 'ASOS', 'Topshop', 'River Island', 'New Look', 'Primark',
    'Next', 'Marks & Spencer', 'John Lewis', 'Selfridges', 'Harrods',
    'Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Versace', 'Armani',
    'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren', 'Hugo Boss',
    'Under Armour', 'Puma', 'Reebok', 'Converse', 'Vans'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBrandChange = (brand) => {
    setFormData(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User created successfully:', result);
        setIsSubmitted(true);
      } else {
        const error = await response.json();
        console.error('Sign up failed:', error);
        alert(`Sign up failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
                <button onClick={() => onNavigate('live-price-alerts')} className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide hover:underline">Live Price Alerts</button>
                <span className="text-sm font-light text-gray-900 transition-colors uppercase tracking-wide">Sign Up</span>
              </nav>
              <div className="flex items-center">
                <a href="#account" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors">Account</a>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Blur Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 via-emerald-500/15 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-400/15 via-cyan-500/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-bl from-purple-400/10 via-pink-500/8 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center px-6 lg:px-8 max-w-4xl mx-auto pt-20">
            <div className="w-24 h-24 bg-green-500/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-6xl lg:text-8xl font-riccione font-light text-white mb-8 leading-none tracking-wider">
              Welcome Aboard!
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Thank you for joining GoingGone! We'll keep you updated on the best deals from your favourite brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate('live-price-alerts')} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-light py-4 px-8 transition-all duration-300 text-lg rounded-full border border-white/20 hover:border-white/40 tracking-wide">
                View Live Alerts
              </button>
              <button onClick={() => onNavigate('home')} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-light py-4 px-8 transition-all duration-300 text-lg rounded-full border border-white/20 hover:border-white/40 tracking-wide">
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              <button onClick={() => onNavigate('live-price-alerts')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Live Price Alerts</button>
              <span className="text-sm font-medium text-gray-900">Sign Up</span>
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
            Join the Waitlist
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to know about the best deals from your favourite brands. Never miss out again.
          </p>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about yourself and your favourite brands
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Brand Selection */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-medium text-gray-900 mb-6">
                Favourite Brands
              </h3>
              <p className="text-gray-600 mb-6">
                Select the brands you're most interested in. This helps us prioritise which deals to show you first.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {popularBrands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={formData.selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className="text-sm font-medium text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
              
              <div className="mt-6">
                <label htmlFor="otherBrand" className="block text-sm font-medium text-gray-700 mb-2">
                  Other Brands
                </label>
                <input
                  type="text"
                  id="otherBrand"
                  name="otherBrand"
                  value={formData.otherBrand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Enter other brands you're interested in (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Separate multiple brands with commas
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-4 px-12 transition-all duration-200 text-lg rounded-lg hover:shadow-lg disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Joining Waitlist...</span>
                  </div>
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
