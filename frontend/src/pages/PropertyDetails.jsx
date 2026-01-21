import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../services/api'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      const { data } = await api.get(`/properties/${id}`)
      setProperty(data.data)
    } catch (error) {
      toast.error('Failed to fetch property details')
      navigate('/properties')
    } finally {
      setLoading(false)
    }
  }

  const onSubmitInquiry = async (data) => {
    if (!user) {
      toast.error('Please login to send an inquiry')
      navigate('/login')
      return
    }

    try {
      await api.post('/inquiries', {
        property: id,
        ...data
      })
      toast.success('Inquiry sent successfully!')
      setShowInquiryForm(false)
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send inquiry')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-xl">Loading property details...</div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-xl">Property not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Images */}
          <div className="mb-6">
            {property.images?.length > 0 ? (
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={`/uploads/properties/${property.images[0].filename}`}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="card">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {property.location.city}, {property.location.subcity}
              {property.location.woreda && `, Woreda ${property.location.woreda}`}
            </div>

            <div className="text-3xl font-bold text-primary-600 mb-6">
              {property.price.toLocaleString()} {property.currency}
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>

            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-semibold">{property.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Area:</span>
                  <span className="ml-2 font-semibold">{property.area.size} {property.area.unit}</span>
                </div>
                {property.features?.bedrooms && (
                  <>
                    <div>
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="ml-2 font-semibold">{property.features.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="ml-2 font-semibold">{property.features.bathrooms}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {property.features && (
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.parking && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      🚗 Parking
                    </span>
                  )}
                  {property.features.furnished && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      🛋️ Furnished
                    </span>
                  )}
                  {property.features.garden && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      🌳 Garden
                    </span>
                  )}
                  {property.features.security && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      🔒 Security
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Contact Owner</h3>
            
            <div className="mb-6">
              <div className="text-gray-600 mb-2">Listed by:</div>
              <div className="font-semibold">
                {property.owner.firstName} {property.owner.lastName}
              </div>
            </div>

            {!showInquiryForm ? (
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full btn btn-primary"
              >
                Send Inquiry
              </button>
            ) : (
              <form onSubmit={handleSubmit(onSubmitInquiry)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="input"
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="input"
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="flex-1 btn btn-primary">
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails