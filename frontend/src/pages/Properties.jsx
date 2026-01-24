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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-in">
          <div>
            <h1 className="section-title mb-2">Browse Properties</h1>
            <p className="text-gray-600">
              {pagination.total > 0 ? (
                <>
                  Found <span className="font-bold text-primary-600">{pagination.total}</span> properties
                </>
              ) : (
                'Discover your dream property'
              )}
            </p>
          </div>
          
          {pagination.total > 0 && (
            <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Page {pagination.page} of {pagination.pages}
            </div>
          )}
        </div>

        <SearchFilter 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onReset={handleReset} 
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="spinner w-16 h-16 mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading properties...</p>
            <p className="text-gray-500 mt-2">Please wait while we fetch the best deals</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="card text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button onClick={handleReset} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {properties.map((property, index) => (
                <div key={property._id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  )
}

export default Properties