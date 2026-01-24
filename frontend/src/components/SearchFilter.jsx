import { useState } from 'react'

const SearchFilter = ({ filters, onFilterChange, onReset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      {/* Search Bar */}
      <div className="card mb-6 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="input pl-12"
              placeholder="Search properties by title or description..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-secondary whitespace-nowrap"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {showAdvanced ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button onClick={onReset} className="btn btn-outline whitespace-nowrap">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="card mb-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="form-group mb-0">
            <label className="form-label">Category</label>
            <select
              className="input"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="residential_land">Residential Land</option>
              <option value="apartment_sale">Apartments for Sale</option>
              <option value="house_rent">Houses for Rent</option>
            </select>
          </div>

          <div className="form-group mb-0">
            <label className="form-label">Property Type</label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="land">Land</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="condominium">Condominium</option>
            </select>
          </div>

          <div className="form-group mb-0">
            <label className="form-label">City</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Addis Ababa"
              value={filters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
            />
          </div>

          <div className="form-group mb-0">
            <label className="form-label">Sort By</label>
            <select
              className="input"
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
            >
              <option value="createdAt">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_asc">Area: Small to Large</option>
              <option value="area_desc">Area: Large to Small</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="card mb-6 animate-slide-up border-2 border-primary-100">
          <div className="flex items-center mb-6">
            <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Advanced Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group mb-0">
              <label className="form-label">Subcity</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Bole"
                value={filters.subcity}
                onChange={(e) => onFilterChange('subcity', e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Min Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Max Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="10,000,000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Min Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minArea}
                onChange={(e) => onFilterChange('minArea', e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Max Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="1000"
                value={filters.maxArea}
                onChange={(e) => onFilterChange('maxArea', e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Bedrooms</label>
              <select
                className="input"
                value={filters.bedrooms}
                onChange={(e) => onFilterChange('bedrooms', e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Bathrooms</label>
              <select
                className="input"
                value={filters.bathrooms}
                onChange={(e) => onFilterChange('bathrooms', e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="col-span-full">
              <label className="form-label mb-4">Property Features</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    checked={filters.parking === 'true'}
                    onChange={(e) => onFilterChange('parking', e.target.checked ? 'true' : '')}
                  />
                  <span className="font-medium text-gray-700">Parking</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    checked={filters.furnished === 'true'}
                    onChange={(e) => onFilterChange('furnished', e.target.checked ? 'true' : '')}
                  />
                  <span className="font-medium text-gray-700">Furnished</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    checked={filters.garden === 'true'}
                    onChange={(e) => onFilterChange('garden', e.target.checked ? 'true' : '')}
                  />
                  <span className="font-medium text-gray-700">Garden</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    checked={filters.security === 'true'}
                    onChange={(e) => onFilterChange('security', e.target.checked ? 'true' : '')}
                  />
                  <span className="font-medium text-gray-700">Security</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchFilter
