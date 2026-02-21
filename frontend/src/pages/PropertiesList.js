import React, { useState, useEffect } from 'react';
import { Search, Grid, List as ListIcon } from 'lucide-react';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Pagination from '../components/Pagination';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    bedrooms: '',
    bathrooms: '',
    parking: false,
    furnished: false,
    garden: false,
    security: false,
    sortBy: 'createdAt',
    page: 1,
    limit: 12,
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Fetch properties
  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Build query params
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] !== '' && filters[key] !== false) {
          params[key] = filters[key];
        }
      });

      const response = await getProperties(params);
      setProperties(response.data || []);
      setPagination(response.pagination || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filter changes
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      bedrooms: '',
      bathrooms: '',
      parking: false,
      furnished: false,
      garden: false,
      security: false,
      sortBy: 'createdAt',
      page: 1,
      limit: 12,
    });
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Browse Properties
          </h1>
          <p className="font-body text-gray-600">
            {pagination.total || 0} properties available
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, location, or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Properties Grid/List */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
              >
                <option value="createdAt">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="area_asc">Area: Small to Large</option>
                <option value="area_desc">Area: Large to Small</option>
                <option value="views">Most Viewed</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-secondary text-white'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-secondary text-white'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && properties.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
                  No Properties Found
                </h3>
                <p className="font-body text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Properties Grid */}
            {!loading && !error && properties.length > 0 && (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {properties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      image={property.images[0]?.filename 
                        ? `http://localhost:5000/uploads/${property.images[0].filename}`
                        : '/placeholder-property.jpg'}
                      title={property.title}
                      location={`${property.location.subcity}, ${property.location.city}`}
                      price={`ETB ${property.price.toLocaleString()}`}
                      beds={property.features.bedrooms || 0}
                      baths={property.features.bathrooms || 0}
                      sqft={property.area.size.toLocaleString()}
                      type={property.category.includes('sale') ? 'sale' : 'rent'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesList;
