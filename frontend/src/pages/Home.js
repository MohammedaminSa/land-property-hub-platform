import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Property in Ethiopia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Buy, Sell, or Rent properties across Ethiopia
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/properties"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Properties
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border-2 border-white"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-5xl mb-4">🏘️</div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Browse thousands of properties including apartments, houses, villas, and land across Ethiopia
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">
              All properties are verified by our admin team to ensure quality and authenticity
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="text-gray-600">
              Connect directly with property owners through our inquiry system
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Property Categories
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              to="/properties?type=apartment"
              className="bg-primary-50 p-6 rounded-lg hover:bg-primary-100 transition text-center"
            >
              <div className="text-4xl mb-2">🏢</div>
              <h3 className="font-semibold text-gray-800">Apartments</h3>
            </Link>

            <Link
              to="/properties?type=house"
              className="bg-primary-50 p-6 rounded-lg hover:bg-primary-100 transition text-center"
            >
              <div className="text-4xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-800">Houses</h3>
            </Link>

            <Link
              to="/properties?type=villa"
              className="bg-primary-50 p-6 rounded-lg hover:bg-primary-100 transition text-center"
            >
              <div className="text-4xl mb-2">🏰</div>
              <h3 className="font-semibold text-gray-800">Villas</h3>
            </Link>

            <Link
              to="/properties?type=land"
              className="bg-primary-50 p-6 rounded-lg hover:bg-primary-100 transition text-center"
            >
              <div className="text-4xl mb-2">🌳</div>
              <h3 className="font-semibold text-gray-800">Land</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of users buying, selling, and renting properties in Ethiopia
          </p>
          <Link
            to={isAuthenticated ? '/properties' : '/register'}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            {isAuthenticated ? 'Browse Properties' : 'Sign Up Now'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
