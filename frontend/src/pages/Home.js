import React from 'react';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <FeaturedProperties />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
