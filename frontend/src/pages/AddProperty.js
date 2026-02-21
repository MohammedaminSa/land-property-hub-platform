import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FormProgress from '../components/FormProgress';
import ImageUploader from '../components/ImageUploader';
import { createProperty } from '../services/propertyService';

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = ['Basic Info', 'Pricing & Area', 'Location', 'Features', 'Images'];

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    description: '',
    category: '',
    type: '',

    // Step 2: Pricing & Area
    price: '',
    currency: 'ETB',
    areaSize: '',
    areaUnit: 'sqm',

    // Step 3: Location
    city: '',
    subcity: '',
    woreda: '',
    kebele: '',
    coordinates: { lat: '', lng: '' },

    // Step 4: Features
    bedrooms: '',
    bathrooms: '',
    parking: false,
    furnished: false,
    garden: false,
    security: false,

    // Step 5: Images
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: {
        ...formData.coordinates,
        [name]: value,
      },
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    setError('');

    switch (step) {
      case 1:
        if (!formData.title || !formData.description || !formData.category || !formData.type) {
          setError('Please fill in all required fields');
          return false;
        }
        if (formData.title.length < 10) {
          setError('Title must be at least 10 characters');
          return false;
        }
        if (formData.description.length < 50) {
          setError('Description must be at least 50 characters');
          return false;
        }
        break;

      case 2:
        if (!formData.price || !formData.areaSize) {
          setError('Please fill in all required fields');
          return false;
        }
        if (formData.price <= 0) {
          setError('Price must be greater than 0');
          return false;
        }
        if (formData.areaSize <= 0) {
          setError('Area size must be greater than 0');
          return false;
        }
        break;

      case 3:
        if (!formData.city || !formData.subcity || !formData.woreda || !formData.kebele) {
          setError('Please fill in all required fields');
          return false;
        }
        break;

      case 4:
        // Features are optional, but validate numbers if provided
        if (formData.bedrooms && formData.bedrooms < 0) {
          setError('Bedrooms cannot be negative');
          return false;
        }
        if (formData.bathrooms && formData.bathrooms < 0) {
          setError('Bathrooms cannot be negative');
          return false;
        }
        break;

      case 5:
        if (formData.images.length === 0) {
          setError('Please upload at least one image');
          return false;
        }
        break;

      default:
        break;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(5)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append basic fields
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('type', formData.type);
      submitData.append('price', formData.price);
      submitData.append('currency', formData.currency);

      // Append location as JSON
      submitData.append('location', JSON.stringify({
        city: formData.city,
        subcity: formData.subcity,
        woreda: formData.woreda,
        kebele: formData.kebele,
        coordinates: formData.coordinates.lat && formData.coordinates.lng
          ? {
              lat: parseFloat(formData.coordinates.lat),
              lng: parseFloat(formData.coordinates.lng),
            }
          : undefined,
      }));

      // Append area as JSON
      submitData.append('area', JSON.stringify({
        size: parseFloat(formData.areaSize),
        unit: formData.areaUnit,
      }));

      // Append features as JSON
      submitData.append('features', JSON.stringify({
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
        parking: formData.parking,
        furnished: formData.furnished,
        garden: formData.garden,
        security: formData.security,
      }));

      // Append images
      formData.images.forEach((image, index) => {
        submitData.append('images', image.file);
        if (image.isPrimary) {
          submitData.append('primaryImageIndex', index);
        }
      });

      await createProperty(submitData);

      // Success - redirect to my properties
      alert('Property submitted successfully! It will be reviewed by admin.');
      navigate('/my-properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            List Your Property
          </h1>
          <p className="font-body text-gray-600">
            Fill in the details below to list your property for sale or rent
          </p>
        </div>

        {/* Progress Indicator */}
        <FormProgress currentStep={currentStep} steps={steps} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Basic Information
                </h2>

                {/* Title */}
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Modern 3-Bedroom Apartment in Bole"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.title.length}/100 characters (minimum 10)
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property in detail..."
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body resize-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.description.length}/2000 characters (minimum 50)
                  </p>
                </div>

                {/* Category and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    >
                      <option value="">Select category</option>
                      <option value="residential_land">Residential Land</option>
                      <option value="apartment_sale">Apartment for Sale</option>
                      <option value="house_rent">House for Rent</option>
                      <option value="commercial">Commercial Property</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    >
                      <option value="">Select type</option>
                      <option value="land">Land</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="condominium">Condominium</option>
                      <option value="office">Office</option>
                      <option value="shop">Shop</option>
                      <option value="warehouse">Warehouse</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Area */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Pricing & Area
                </h2>

                {/* Price and Currency */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    >
                      <option value="ETB">ETB (Birr)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                </div>

                {/* Area Size and Unit */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Area Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      name="areaUnit"
                      value={formData.areaUnit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    >
                      <option value="sqm">Square Meters (sqm)</option>
                      <option value="hectare">Hectare</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Location
                </h2>

                {/* City and Subcity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    >
                      <option value="">Select city</option>
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Dire Dawa">Dire Dawa</option>
                      <option value="Mekelle">Mekelle</option>
                      <option value="Gondar">Gondar</option>
                      <option value="Hawassa">Hawassa</option>
                      <option value="Bahir Dar">Bahir Dar</option>
                      <option value="Adama">Adama</option>
                      <option value="Jimma">Jimma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Subcity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subcity"
                      value={formData.subcity}
                      onChange={handleChange}
                      placeholder="e.g., Bole"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>
                </div>

                {/* Woreda and Kebele */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Woreda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="woreda"
                      value={formData.woreda}
                      onChange={handleChange}
                      placeholder="e.g., 03"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Kebele <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="kebele"
                      value={formData.kebele}
                      onChange={handleChange}
                      placeholder="e.g., 12"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>
                </div>

                {/* Coordinates (Optional) */}
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    Coordinates (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="number"
                      name="lat"
                      value={formData.coordinates.lat}
                      onChange={handleCoordinateChange}
                      placeholder="Latitude"
                      step="any"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                    <input
                      type="number"
                      name="lng"
                      value={formData.coordinates.lng}
                      onChange={handleCoordinateChange}
                      placeholder="Longitude"
                      step="any"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Features */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Features & Amenities
                </h2>

                {/* Bedrooms and Bathrooms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                    />
                  </div>
                </div>

                {/* Amenities Checkboxes */}
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-4">
                    Amenities
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        name="parking"
                        checked={formData.parking}
                        onChange={handleChange}
                        className="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                      />
                      <span className="font-body text-gray-700">Parking Available</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        name="furnished"
                        checked={formData.furnished}
                        onChange={handleChange}
                        className="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                      />
                      <span className="font-body text-gray-700">Furnished</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        name="garden"
                        checked={formData.garden}
                        onChange={handleChange}
                        className="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                      />
                      <span className="font-body text-gray-700">Garden</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        name="security"
                        checked={formData.security}
                        onChange={handleChange}
                        className="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                      />
                      <span className="font-body text-gray-700">24/7 Security</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Images */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Property Images
                </h2>

                <ImageUploader
                  images={formData.images}
                  setImages={(images) => setFormData({ ...formData, images })}
                  maxImages={10}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-body font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-body font-semibold rounded-xl transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-body font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Property'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
