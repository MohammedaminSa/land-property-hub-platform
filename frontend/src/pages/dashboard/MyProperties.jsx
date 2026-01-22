import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/authStore'

const MyProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    fetchMyProperties()
  }, [])

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/properties/my-properties')
      setProperties(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return

    try {
      await api.delete(`/properties/${id}`)
      toast.success('Property deleted successfully')
      fetchMyProperties()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete property')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Properties</h2>
        {user?.isApproved && (
          <Link to="/properties/new" className="btn btn-primary">
            + Add Property
          </Link>
        )}
      </div>

      {!user?.isApproved && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <p className="text-gray-700">
            Your account is pending approval. You'll be able to add properties once approved.
          </p>
        </div>
      )}

      {properties.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first property</p>
          {user?.isApproved && (
            <Link to="/properties/new" className="btn btn-primary">
              Add Property
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => (
            <div key={property._id} className="card">
              <div className="flex gap-4">
                <img
                  src={property.images?.[0] || '/placeholder.jpg'}
                  alt={property.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                      <p className="text-gray-600 mb-2">{property.location}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>🛏️ {property.bedrooms} beds</span>
                        <span>🚿 {property.bathrooms} baths</span>
                        <span>📐 {property.area} m²</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {property.price.toLocaleString()} ETB
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {property.listingType}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      property.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : property.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {property.status}
                    </span>
                    <Link
                      to={`/properties/${property._id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/properties/${property._id}/edit`}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="btn btn-secondary btn-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProperties
