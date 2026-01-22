import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/authStore'

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const { user } = useAuthStore()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const endpoint = ['seller', 'landlord', 'agent'].includes(user?.role)
        ? '/inquiries/received'
        : '/inquiries/sent'
      
      const response = await api.get(endpoint)
      setInquiries(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch inquiries')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status })
      toast.success('Status updated successfully')
      fetchInquiries()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true
    return inquiry.status === filter
  })

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {['seller', 'landlord', 'agent'].includes(user?.role) 
            ? 'Received Inquiries' 
            : 'My Inquiries'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending' ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('responded')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'responded' ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            Responded
          </button>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">No Inquiries</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'You have no inquiries yet' 
              : `No ${filter} inquiries`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link
                    to={`/properties/${inquiry.property?._id}`}
                    className="text-lg font-semibold hover:text-primary-600"
                  >
                    {inquiry.property?.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {inquiry.property?.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  inquiry.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : inquiry.status === 'responded'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {inquiry.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">
                  From: {inquiry.user?.firstName} {inquiry.user?.lastName}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {inquiry.user?.email} | {inquiry.user?.phone}
                </div>
                <p className="text-gray-700">{inquiry.message}</p>
              </div>

              {inquiry.response && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-sm font-semibold mb-1">Response:</div>
                  <p className="text-gray-700">{inquiry.response}</p>
                </div>
              )}

              <div className="text-xs text-gray-500">
                {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>

              {['seller', 'landlord', 'agent'].includes(user?.role) && 
               inquiry.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(inquiry._id, 'responded')}
                    className="btn btn-primary btn-sm"
                  >
                    Mark as Responded
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(inquiry._id, 'closed')}
                    className="btn btn-secondary btn-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyInquiries
