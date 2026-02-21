import React, { useState, useEffect } from 'react';
import { Search, Grid, List as ListIcon } from 'lucide-react';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Pagination from '../components/Pagination';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';
import property4 from '../assets/property-4.jpg';
import property5 from '../assets/property-5.jpg';
import property6 from '../assets/property-6.jpg';

// Mock properties data (same as home page)
const mockProperties = [
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
    category: 'apartment',
    city: 'Addis Ababa',
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
    category: 'house',
    city: 'Addis Ababa',
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
    category: 'condo',
    city: 'Addis Ababa',
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
    category: 'apartment',
    city: 'Addis Ababa',
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
    category: 'penthouse',
    city: 'Addis Ababa',
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
    category: 'villa',
    city: 'Addis Ababa',
  },
];

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
      // TODO: Replace with real API call when backend has properties
      // For now, use mock data and apply filters locally
      
      let filteredProperties = [...mockProperties];

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProperties = filteredProperties.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower)
        );
      }

      // Apply category filter
      if (filters.category) {
        filteredProperties = filteredProperties.filter(p => 
          p.category === filters.category
        );
      }

      // Apply type filter
      if (filters.type) {
        filteredProperties = filteredProperties.filter(p => 
          p.type === filters.type
        );
      }

      // Apply city filter
      if (filters.city) {
        filteredProperties = filteredProperties.filter(p => 
          p.city === filters.city
        );
      }

      // Apply bedrooms filter
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => 
          p.beds >= parseInt(filters.bedrooms)
        );
      }

      // Apply bathrooms filter
      if (filters.bathrooms) {
        filteredProperties = filteredProperties.filter(p => 
          p.baths >= parseInt(filters.bathrooms)
        );
      }

      // Apply sorting
      if (filters.sortBy === 'price_asc') {
        filteredProperties.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
      } else if (filters.sortBy === 'price_desc') {
        filteredProperties.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
      } else if (filters.sortBy === 'area_asc') {
        filteredProperties.sort((a, b) => {
          const areaA = parseInt(a.sqft.replace(/[^0-9]/g, ''));
          const areaB = parseInt(b.sqft.replace(/[^0-9]/g, ''));
          return areaA - areaB;
        });
      } else if (filters.sortBy === 'area_desc') {
        filteredProperties.sort((a, b) => {
          const areaA = parseInt(a.sqft.replace(/[^0-9]/g, ''));
          const areaB = parseInt(b.sqft.replace(/[^0-9]/g, ''));
          return areaB - areaA;
        });
      }

      // Simulate pagination
      const total = filteredProperties.length;
      const pages = Math.ceil(total / filters.limit);
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

      setProperties(paginatedProperties);
      setPagination({
        page: filters.page,
        pages: pages,
        total: total,
        hasNext: filters.page < pages,
        hasPrev: filters.page > 1,
      });

      // Uncomment below when backend has real properties
      /*
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] !== '' && filters[key] !== false) {
          params[key] = filters[key];
        }
      });

      const response = await getProperties(params);
      setProperties(response.data || []);
      setPagination(response.pagination || {});
      */
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
                      key={property.id}
                      id={property.id}
                      image={property.image}
                      title={property.title}
                      location={property.location}
                      price={property.price}
                      beds={property.beds}
                      baths={property.baths}
                      sqft={property.sqft}
                      type={property.type}
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
