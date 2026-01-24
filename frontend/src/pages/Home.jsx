import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const navigate = useNavigate()
  const [quickSearch, setQuickSearch] = useState({
    category: '',
    city: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleQuickSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.keys(quickSearch).forEach(key => {
      if (quickSearch[key]) params.append(key, quickSearch[key])
    })
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your Dream Property<br />
              <span className="text-accent-300">in Ethiopia</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100">
              Browse thousands of verified properties for sale and rent across Ethiopia. 
              Your trusted real estate platform.
            </p>

            {/* Quick Search */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-10 animate-slide-up">
              <form onSubmit={handleQuickSearch}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    className="input text-gray-900"
                    value={quickSearch.category}
                    onChange={(e) => setQuickSearch({ ...quickSearch, category: e.target.value })}
                  >
                    <option value="">All Categories</option>
                    <option value="residential_land">Residential Land</option>
                    <option value="apartment_sale">Apartments for Sale</option>
                    <option value="house_rent">Houses for Rent</option>
                  </select>

                  <input
                    type="text"
                    className="input text-gray-900"
                    placeholder="City (e.g., Addis Ababa)"
                    value={quickSearch.city}
                    onChange={(e) => setQuickSearch({ ...quickSearch, city: e.target.value })}
                  />

                  <input
                    type="number"
                    className="input text-gray-900"
                    placeholder="Min Price (ETB)"
                    value={quickSearch.minPrice}
                    onChange={(e) => setQuickSearch({ ...quickSearch, minPrice: e.target.value })}
                  />

                  <button type="submit" className="btn btn-primary">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/properties" className="btn bg-white text-primary-600 hover:bg-gray-50 shadow-xl">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse All Properties
              </Link>
              <Link to="/register" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="section-title">Property Categories</h2>
            <p className="section-subtitle mx-auto">Explore properties by category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/properties?category=house_rent" className="feature-card text-center group animate-slide-up">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🏡</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">Houses for Rent</h3>
              <p className="text-gray-600 mb-6">Find comfortable houses for rent in prime locations across Ethiopia</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                Browse Houses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link to="/properties?category=apartment_sale" className="feature-card text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">Apartments for Sale</h3>
              <p className="text-gray-600 mb-6">Discover modern apartments ready for purchase in major cities</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                Browse Apartments
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link to="/properties?category=residential_land" className="feature-card text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🌳</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">Land for Sale</h3>
              <p className="text-gray-600 mb-6">Invest in residential land with great potential for development</p>
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                Browse Land
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle mx-auto">Your trusted partner in real estate</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
              <p className="text-gray-600">All properties are thoroughly verified by our expert team</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Platform</h3>
              <p className="text-gray-600">Your data is safe and protected with advanced security</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Contact</h3>
              <p className="text-gray-600">Connect directly with property owners and agents</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy to Use</h3>
              <p className="text-gray-600">Simple and intuitive interface for seamless experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home