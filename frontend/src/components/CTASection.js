import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Find Your <span className="text-secondary">Perfect Place</span>?
        </h2>
        <p className="font-body text-gray-200 text-lg max-w-2xl mx-auto mb-10">
          Whether you're looking to buy, rent, sell, or lease — join thousands of users who trust our marketplace for their real estate needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="bg-secondary hover:bg-secondary-dark text-white px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Properties
          </Link>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-primary-600 px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
