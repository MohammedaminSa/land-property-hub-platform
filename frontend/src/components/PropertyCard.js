import React from 'react';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';

const PropertyCard = ({ image, title, location, price, beds, baths, sqft, type }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <span
          className={`absolute top-4 left-4 font-body text-xs font-semibold px-3 py-1 rounded-full ${
            type === 'sale'
              ? 'bg-secondary text-white'
              : 'bg-primary-600 text-white'
          }`}
        >
          For {type === 'sale' ? 'Sale' : 'Rent'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-secondary transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="font-body text-sm text-gray-500">{location}</span>
        </div>

        <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-gray-500" />
            <span className="font-body text-sm text-gray-500">{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-gray-500" />
            <span className="font-body text-sm text-gray-500">{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-gray-500" />
            <span className="font-body text-sm text-gray-500">{sqft} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-display text-xl font-bold text-secondary">{price}</p>
          <span className="font-body text-xs text-gray-500">
            {type === 'rent' ? '/month' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
