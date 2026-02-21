import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';
import property4 from '../assets/property-4.jpg';
import property5 from '../assets/property-5.jpg';
import property6 from '../assets/property-6.jpg';

const properties = [
  {
    id: 'featured-1',
    image: property1,
    title: 'Modern City Apartment',
    location: 'Bole, Addis Ababa',
    price: 'ETB 2,400,000',
    beds: 2,
    baths: 1,
    sqft: '1,100',
    type: 'sale',
  },
  {
    id: 'featured-2',
    image: property2,
    title: 'Charming Family Home',
    location: 'Kazanchis, Addis Ababa',
    price: 'ETB 4,850,000',
    beds: 4,
    baths: 3,
    sqft: '2,800',
    type: 'sale',
  },
  {
    id: 'featured-3',
    image: property3,
    title: 'Luxury Condo Tower',
    location: 'CMC, Addis Ababa',
    price: 'ETB 12,500,000',
    beds: 3,
    baths: 2,
    sqft: '1,950',
    type: 'sale',
  },
  {
    id: 'featured-4',
    image: property4,
    title: 'Cozy Apartment',
    location: 'Megenagna, Addis Ababa',
    price: 'ETB 18,000',
    beds: 3,
    baths: 2,
    sqft: '1,600',
    type: 'rent',
  },
  {
    id: 'featured-5',
    image: property5,
    title: 'Skyline Penthouse',
    location: 'Sarbet, Addis Ababa',
    price: 'ETB 32,000,000',
    beds: 4,
    baths: 3,
    sqft: '3,500',
    type: 'sale',
  },
  {
    id: 'featured-6',
    image: property6,
    title: 'Mediterranean Villa',
    location: 'Old Airport, Addis Ababa',
    price: 'ETB 28,000,000',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    type: 'sale',
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Curated For You
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="font-body text-gray-600 max-w-xl mx-auto">
            Hand-picked listings from our trusted sellers and landlords
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-block font-body font-semibold px-8 py-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
