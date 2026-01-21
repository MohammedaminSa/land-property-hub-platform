import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Property in Ethiopia
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse thousands of properties for sale and rent across Ethiopia. 
            Your trusted real estate platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/properties" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link to="/register" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600">
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Property Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-xl font-semibold mb-2">Houses for Rent</h3>
              <p className="text-gray-600 mb-4">Find comfortable houses for rent in prime locations</p>
              <Link to="/properties?category=house_rent" className="text-primary-600 font-semibold">
                Browse Houses →
              </Link>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2">Apartments for Sale</h3>
              <p className="text-gray-600 mb-4">Discover modern apartments ready for purchase</p>
              <Link to="/properties?category=apartment_sale" className="text-primary-600 font-semibold">
                Browse Apartments →
              </Link>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🌳</div>
              <h3 className="text-xl font-semibold mb-2">Land for Sale</h3>
              <p className="text-gray-600 mb-4">Invest in residential land across Ethiopia</p>
              <Link to="/properties?category=residential_land" className="text-primary-600 font-semibold">
                Browse Land →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">All properties are verified by our team</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Your data is safe and protected</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold mb-2">Direct Contact</h3>
              <p className="text-gray-600">Connect directly with property owners</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple and intuitive interface</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home