import React from 'react';
import { X } from 'lucide-react';

const PropertyFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { value: 'residential_land', label: 'Residential Land' },
    { value: 'apartment_sale', label: 'Apartment Sale' },
    { value: 'house_rent', label: 'House Rent' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const types = [
    { value: 'land', label: 'Land' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'condominium', label: 'Condominium' },
  ];

  const cities = [
    'Addis Ababa',
    'Dire Dawa',
    'Mekelle',
    'Gondar',
    'Bahir Dar',
    'Hawassa',
    'Adama',
    'Jimma',
  ];

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4];

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-secondary hover:text-secondary-dark font-medium flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Price Range (ETB)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </div>

        {/* Area Range */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Area (sqm)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minArea || ''}
              onChange={(e) => onFilterChange('minArea', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxArea || ''}
              onChange={(e) => onFilterChange('maxArea', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Minimum Bedrooms
          </label>
          <div className="flex gap-2">
            {bedroomOptions.map((num) => (
              <button
                key={num}
                onClick={() => onFilterChange('bedrooms', filters.bedrooms === num ? '' : num)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  filters.bedrooms === num
                    ? 'bg-secondary text-white'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-2">
            Minimum Bathrooms
          </label>
          <div className="flex gap-2">
            {bathroomOptions.map((num) => (
              <button
                key={num}
                onClick={() => onFilterChange('bathrooms', filters.bathrooms === num ? '' : num)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  filters.bathrooms === num
                    ? 'bg-secondary text-white'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block font-body text-sm font-medium text-gray-700 mb-3">
            Features
          </label>
          <div className="space-y-2">
            {['parking', 'furnished', 'garden', 'security'].map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[feature] || false}
                  onChange={(e) => onFilterChange(feature, e.target.checked)}
                  className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                <span className="font-body text-sm text-gray-700 capitalize">
                  {feature}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
