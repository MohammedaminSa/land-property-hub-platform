import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import toast from 'react-hot-toast'

const ManageProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => {
    fetchProperties()
  }, [filter])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = filter ? `?status=${filter}` : ''
      const { data } = await api.get(`/admin/properties${params}`)
      setProperties(data.data)
    } catch (error) {
      toast.error('Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/properties/${id}/approve`)
      toast.success('Property approved successfully')
      fetchProperties()
    } catch (error) {
      toast.error('Failed to approve property')
    }
  }

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return

    try {
      await api.put(`/admin/properties/${id}/reject`, { reason })
      toast.success('Property rejected')
      fetchProperties()
    } catch (error) {
      toast.error('Failed to reject property')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Manage Properties</h1>
        <p className="text-gray-600">Review and approve property listings</p>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'approved'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'rejected'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilter('')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === ''
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Properties List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner w-12 h-12"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-gray-600">No {filter} properties found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property._id} className="card card-hover">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-64 flex-shrink-0">
                  <div className="aspect-video md:aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                    {property.images?.[0] ? (
                      <img
                        src={`/uploads/properties/${property.images[0].filename}`}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold truncate">{property.title}</h3>
                        <span className={`badge ${
                          property.status === 'approved' 
                            ? 'badge-success'
                            : property.status === 'pending'
                            ? 'badge-warning'
                            : 'badge-danger'
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {property.location.city}, {property.location.subcity}
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-semibold">Owner:</span> {property.owner.firstName} {property.owner.lastName}
                        <br />
                        <span className="font-semibold">Email:</span> {property.owner.email}
                        <br />
                        <span className="font-semibold">Phone:</span> {property.owner.phone}
                      </div>

                      <p className="text-gray-700 line-clamp-2">{property.description}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {property.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold mb-3">
                        {property.currency}
                      </div>
                      <div className="text-sm text-gray-600">
                        {property.area.size} {property.area.unit}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                    <Link
                      to={`/properties/${property._id}`}
                      target="_blank"
                      className="btn btn-secondary btn-sm"
                    >
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>

                    {property.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(property._id)}
                          className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                        >
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(property._id)}
                          className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                        >
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </>
                    )}

                    {property.status === 'rejected' && property.rejectionReason && (
                      <div className="text-sm text-red-600">
                        <span className="font-semibold">Reason:</span> {property.rejectionReason}
                      </div>
                    )}

                    {property.views > 0 && (
                      <span className="ml-auto text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {property.views} views
                      </span>
                    )}
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

export default ManageProperties
