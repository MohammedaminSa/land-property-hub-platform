import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import SearchFilter from '../components/SearchFilter'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    subcity: searchParams.get('subcity') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    parking: searchParams.get('parking') || '',
    furnished: searchParams.get('furnished') || '',
    garden: searchParams.get('garden') || '',
    security: searchParams.get('security') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    page: searchParams.get('page') || 1
  })

  useEffect(() => {
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key])
      })
      
      const { data } = await api.get(`/properties?${params}`)
      setProperties(data.data)
      setPagination(data.pagination)
    } catch (error) {
      toast.error('Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
    
    // Update URL params
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params.set(k, newFilters[k])
    })
    setSearchParams(params)
  }

  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: '',
      type: '',
      city: '',
      subcity: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      bedrooms: '',
      bathrooms: '',
      parking: '',
      furnished: '',
      garden: '',
      security: '',
      sortBy: 'createdAt',
      page: 1
    }
    setFilters(resetFilters)
    setSearchParams({})
  }

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Properties</h1>
        <div className="text-gray-600">
          {pagination.total > 0 && `${pagination.total} properties found`}
        </div>
      </div>

      {/* Search Bar */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            className="input flex-1"
            placeholder="Search properties by title or description..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-secondary"
          >
            {showAdvanced ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button onClick={handleReset} className="btn btn-outline">
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
              onChange={(e) => handleFilterChange('category', e.target.value)}
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
              onChange={(e) => handleFilterChange('type', e.target.value)}
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
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              className="input"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
                onChange={(e) => handleFilterChange('subcity', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Price (ETB)</label>
              <input
                type="number"
                className="input"
                placeholder="10,000,000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minArea}
                onChange={(e) => handleFilterChange('minArea', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Area (sqm)</label>
              <input
                type="number"
                className="input"
                placeholder="1000"
                value={filters.maxArea}
                onChange={(e) => handleFilterChange('maxArea', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <select
                className="input"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
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
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
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
                    onChange={(e) => handleFilterChange('parking', e.target.checked ? 'true' : '')}
                  />
                  Parking
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.furnished === 'true'}
                    onChange={(e) => handleFilterChange('furnished', e.target.checked ? 'true' : '')}
                  />
                  Furnished
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.garden === 'true'}
                    onChange={(e) => handleFilterChange('garden', e.target.checked ? 'true' : '')}
                  />
                  Garden
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.security === 'true'}
                    onChange={(e) => handleFilterChange('security', e.target.checked ? 'true' : '')}
                  />
                  Security
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-xl">Loading properties...</div>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">No properties found</div>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property._id}
                to={`/properties/${property._id}`}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {property.images?.[0] ? (
                    <img
                      src={`/uploads/properties/${property.images[0].filename}`}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {property.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{property.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-2xl font-bold text-primary-600">
                    {property.price.toLocaleString()} {property.currency}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location.city}, {property.location.subcity}
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {property.area.size} {property.area.unit}
                </div>
                
                {property.features?.bedrooms && (
                  <div className="mt-2 text-sm text-gray-600">
                    🛏️ {property.features.bedrooms} Beds • 🚿 {property.features.bathrooms} Baths
                  </div>
                )}

                {property.views > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    👁️ {property.views} views
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded ${
                      pagination.page === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Properties