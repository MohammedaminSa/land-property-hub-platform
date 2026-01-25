import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../services/api'
import toast from 'react-hot-toast'

const CreateProperty = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      category: 'residential_land',
      type: 'land',
      currency: 'ETB',
      'area.unit': 'sqm',
      'features.parking': false,
      'features.furnished': false,
      'features.garden': false,
      'features.security': false,
    }
  })

  const category = watch('category')
  const type = watch('type')

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 10) {
      toast.error('Maximum 10 images allowed')
      return
    }

    setImages([...images, ...files])
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setLoading(true)
    try {
      // Create property
      const propertyData = {
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        price: parseFloat(data.price),
        currency: data.currency,
        area: {
          size: parseFloat(data['area.size']),
          unit: data['area.unit']
        },
        location: {
          city: data['location.city'],
          subcity: data['location.subcity'],
          woreda: data['location.woreda'] || '',
          kebele: data['location.kebele'] || ''
        },
        features: {
          bedrooms: data['features.bedrooms'] ? parseInt(data['features.bedrooms']) : 0,
          bathrooms: data['features.bathrooms'] ? parseInt(data['features.bathrooms']) : 0,
          parking: data['features.parking'],
          furnished: data['features.furnished'],
          garden: data['features.garden'],
          security: data['features.security']
        }
      }

      const response = await api.post('/properties', propertyData)
      const propertyId = response.data.data._id

      // Upload images
      const formData = new FormData()
      images.forEach(image => {
        formData.append('images', image)
      })

      await api.post(`/properties/${propertyId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success('Property created successfully!')
      navigate('/dashboard/my-properties')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="section-title">Create New Property</h1>
          <p className="text-gray-600">Fill in the details to list your property</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Property Title *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Modern 3 Bedroom Apartment in Bole"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Description *</label>
                <textarea
                  rows="5"
                  className="input"
                  placeholder="Describe your property in detail..."
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category *</label>
                  <select className="input" {...register('category')}>
                    <option value="residential_land">Residential Land</option>
                    <option value="apartment_sale">Apartment for Sale</option>
                    <option value="house_rent">House for Rent</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Property Type *</label>
                  <select className="input" {...register('type')}>
                    <option value="land">Land</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="condominium">Condominium</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Area */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Price & Area</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  {...register('price', { required: 'Price is required', min: 0 })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Currency</label>
                <select className="input" {...register('currency')}>
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <div>
                <label className="form-label">Area Size *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  {...register('area.size', { required: 'Area is required', min: 1 })}
                />
                {errors['area.size'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['area.size'].message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Unit</label>
                <select className="input" {...register('area.unit')}>
                  <option value="sqm">Square Meters (sqm)</option>
                  <option value="hectare">Hectare</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">City *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Addis Ababa"
                  {...register('location.city', { required: 'City is required' })}
                />
                {errors['location.city'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['location.city'].message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Subcity *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Bole"
                  {...register('location.subcity', { required: 'Subcity is required' })}
                />
                {errors['location.subcity'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['location.subcity'].message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Woreda (Optional)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., 03"
                  {...register('location.woreda')}
                />
              </div>

              <div>
                <label className="form-label">Kebele (Optional)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., 12"
                  {...register('location.kebele')}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          {(type === 'apartment' || type === 'house' || type === 'villa' || type === 'condominium') && (
            <div className="card">
              <h2 className="text-xl font-bold mb-6">Property Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="form-label">Bedrooms</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="0"
                    min="0"
                    {...register('features.bedrooms')}
                  />
                </div>

                <div>
                  <label className="form-label">Bathrooms</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="0"
                    min="0"
                    {...register('features.bathrooms')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    {...register('features.parking')}
                  />
                  <span className="font-medium">Parking</span>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    {...register('features.furnished')}
                  />
                  <span className="font-medium">Furnished</span>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    {...register('features.garden')}
                  />
                  <span className="font-medium">Garden</span>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mr-3"
                    {...register('features.security')}
                  />
                  <span className="font-medium">Security</span>
                </label>
              </div>
            </div>
          )}

          {/* Images */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Property Images *</h2>
            
            <div className="mb-4">
              <label className="btn btn-secondary cursor-pointer inline-block">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-600 mt-2">Upload up to 10 images (JPG, PNG)</p>
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Property'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-properties')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProperty
