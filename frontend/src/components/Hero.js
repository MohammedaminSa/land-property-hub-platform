import React from 'react';
import { Search, Home, Building } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury home" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-secondary text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Find Your Dream Property
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Where Every Door Opens to{' '}
            <span className="text-secondary">Home</span>
          </h1>
          <p className="font-body text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover properties for sale or rent across Ethiopia. Whether you're buying, selling, or leasing — your perfect match is here.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-elevated">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, or address..."
                  className="w-full bg-transparent outline-none font-body text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Home className="w-4 h-4 text-gray-600" />
                  <span className="font-body text-sm text-gray-600">Buy</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Building className="w-4 h-4 text-gray-600" />
                  <span className="font-body text-sm text-gray-600">Rent</span>
                </div>
                <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-8 md:gap-16">
            {[
              { label: 'Properties Listed', value: '12,500+' },
              { label: 'Happy Clients', value: '8,200+' },
              { label: 'Cities Covered', value: '150+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="font-body text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
