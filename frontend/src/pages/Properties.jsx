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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Properties</h1>
        <div className="text-gray-600">
          {pagination.total > 0 && `${pagination.total} properties found`}
        </div>
      </div>

      <SearchFilter 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onReset={handleReset} 
      />

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
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default Properties