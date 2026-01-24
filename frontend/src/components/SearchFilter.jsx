import { useState } from 'react'

const SearchFilter = ({ filters, onFilterChange, onReset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      {/* Search Bar */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            className="input flex-1"
            placeholder="Search properties by title or description..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-secondary"
          >
            {showAdvanced ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button onClick={onReset} className="btn btn-outline">
            Reset
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
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

          <div>
            <label className="block text-sm font-medium mb-2">Property Type</label>
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

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Addis Ababa"
              value={filters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
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
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subcity</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Bole"
                value={filters.subcity}
                onChange={(e) => onFilterChange('subcity', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="10,000,000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minArea}
                onChange={(e) => onFilterChange('minArea', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="1000"
                value={filters.maxArea}
                onChange={(e) => onFilterChange('maxArea', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
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

            <div>
              <label className="block text-sm font-medium mb-2">Bathrooms</label>
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
              <label className="block text-sm font-medium mb-3">Features</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.parking === 'true'}
                    onChange={(e) => onFilterChange('parking', e.target.checked ? 'true' : '')}
                  />
                  Parking
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.furnished === 'true'}
                    onChange={(e) => onFilterChange('furnished', e.target.checked ? 'true' : '')}
                  />
                  Furnished
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.garden === 'true'}
                    onChange={(e) => onFilterChange('garden', e.target.checked ? 'true' : '')}
                  />
                  Garden
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.security === 'true'}
                    onChange={(e) => onFilterChange('security', e.target.checked ? 'true' : '')}
                  />
                  Security
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
