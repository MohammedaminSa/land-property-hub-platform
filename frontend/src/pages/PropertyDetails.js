import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize, Calendar, Eye, 
  Home, ChevronRight, Share2, Heart
} from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import OwnerCard from '../components/OwnerCard';
import InquiryForm from '../components/InquiryForm';
import SimilarProperties from '../components/SimilarProperties';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';
import property4 from '../assets/property-4.jpg';
import property5 from '../assets/property-5.jpg';
import property6 from '../assets/property-6.jpg';

// Mock properties data
const mockProperties = [
  {
    id: 'featured-1',
    image: property1,
    images: [property1, property2, property3],
    title: 'Modern City Apartment',
    description: 'Beautiful modern apartment in the heart of Bole. This stunning property features contemporary design, high-quality finishes, and excellent natural lighting. Perfect for young professionals or small families looking for a comfortable urban lifestyle. The apartment is located in a secure building with 24/7 security, elevator access, and ample parking space.',
    location: 'Bole, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'Bole',
    woreda: '03',
    kebele: '12',
    price: 'ETB 2,400,000',
    priceValue: 2400000,
    beds: 2,
    baths: 1,
    sqft: '1,100',
    type: 'sale',
    category: 'apartment',
    features: {
      parking: true,
      furnished: false,
      garden: false,
      security: true,
    },
    views: 245,
    postedDate: '2024-01-15',
    owner: {
      firstName: 'Abebe',
      lastName: 'Kebede',
      role: 'seller',
      phoneNumber: '+251 911 234 567',
      email: 'abebe.kebede@example.com',
    },
  },
  {
    id: 'featured-2',
    image: property2,
    images: [property2, property1, property4],
    title: 'Charming Family Home',
    description: 'Spacious family home in Kazanchis with 4 bedrooms and 3 bathrooms. This property offers generous living spaces, a modern kitchen, and a beautiful garden. Ideal for families seeking comfort and convenience in a prime location.',
    location: 'Kazanchis, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'Kazanchis',
    woreda: '07',
    kebele: '18',
    price: 'ETB 4,850,000',
    priceValue: 4850000,
    beds: 4,
    baths: 3,
    sqft: '2,800',
    type: 'sale',
    category: 'house',
    features: {
      parking: true,
      furnished: false,
      garden: true,
      security: true,
    },
    views: 189,
    postedDate: '2024-01-10',
    owner: {
      firstName: 'Tigist',
      lastName: 'Haile',
      role: 'seller',
      phoneNumber: '+251 912 345 678',
      email: 'tigist.haile@example.com',
    },
  },
  {
    id: 'featured-3',
    image: property3,
    images: [property3, property5, property6],
    title: 'Luxury Condo Tower',
    description: 'Premium condominium in CMC area with stunning city views. Features include modern amenities, spacious rooms, and excellent security. Perfect for those seeking luxury urban living.',
    location: 'CMC, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'CMC',
    woreda: '05',
    kebele: '15',
    price: 'ETB 12,500,000',
    priceValue: 12500000,
    beds: 3,
    baths: 2,
    sqft: '1,950',
    type: 'sale',
    category: 'condo',
    features: {
      parking: true,
      furnished: true,
      garden: false,
      security: true,
    },
    views: 412,
    postedDate: '2024-01-20',
    owner: {
      firstName: 'Dawit',
      lastName: 'Tesfaye',
      role: 'agent',
      phoneNumber: '+251 913 456 789',
      email: 'dawit.tesfaye@example.com',
    },
  },
  {
    id: 'featured-4',
    image: property4,
    images: [property4, property2, property1],
    title: 'Cozy Apartment',
    description: 'Comfortable apartment for rent in Megenagna. Well-maintained property with modern amenities and convenient location near shopping centers and public transport.',
    location: 'Megenagna, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'Megenagna',
    woreda: '08',
    kebele: '20',
    price: 'ETB 18,000',
    priceValue: 18000,
    beds: 3,
    baths: 2,
    sqft: '1,600',
    type: 'rent',
    category: 'apartment',
    features: {
      parking: true,
      furnished: true,
      garden: false,
      security: true,
    },
    views: 156,
    postedDate: '2024-01-18',
    owner: {
      firstName: 'Meron',
      lastName: 'Alemayehu',
      role: 'landlord',
      phoneNumber: '+251 914 567 890',
      email: 'meron.alemayehu@example.com',
    },
  },
  {
    id: 'featured-5',
    image: property5,
    images: [property5, property3, property6],
    title: 'Skyline Penthouse',
    description: 'Exclusive penthouse in Sarbet with panoramic city views. This luxurious property features high-end finishes, spacious terraces, and premium amenities. Perfect for discerning buyers.',
    location: 'Sarbet, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'Sarbet',
    woreda: '04',
    kebele: '10',
    price: 'ETB 32,000,000',
    priceValue: 32000000,
    beds: 4,
    baths: 3,
    sqft: '3,500',
    type: 'sale',
    category: 'penthouse',
    features: {
      parking: true,
      furnished: true,
      garden: true,
      security: true,
    },
    views: 523,
    postedDate: '2024-01-22',
    owner: {
      firstName: 'Solomon',
      lastName: 'Bekele',
      role: 'agent',
      phoneNumber: '+251 915 678 901',
      email: 'solomon.bekele@example.com',
    },
  },
  {
    id: 'featured-6',
    image: property6,
    images: [property6, property4, property5],
    title: 'Mediterranean Villa',
    description: 'Stunning villa in Old Airport area with Mediterranean architecture. Features include spacious rooms, beautiful gardens, swimming pool, and premium security. Ideal for luxury living.',
    location: 'Old Airport, Addis Ababa',
    city: 'Addis Ababa',
    subcity: 'Old Airport',
    woreda: '06',
    kebele: '14',
    price: 'ETB 28,000,000',
    priceValue: 28000000,
    beds: 5,
    baths: 4,
    sqft: '4,200',
    type: 'sale',
    category: 'villa',
    features: {
      parking: true,
      furnished: false,
      garden: true,
      security: true,
    },
    views: 378,
    postedDate: '2024-01-12',
    owner: {
      firstName: 'Hanna',
      lastName: 'Girma',
      role: 'seller',
      phoneNumber: '+251 916 789 012',
      email: 'hanna.girma@example.com',
    },
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchProperty();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with real API call
      // const response = await getPropertyById(id);
      // setProperty(response.data);
      
      // For now, use mock data
      const foundProperty = mockProperties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        setError('Property not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save to favorites functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
            Property Not Found
          </h2>
          <p className="font-body text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/properties')}
            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 font-body text-sm text-gray-600">
            <Link to="/" className="hover:text-secondary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/properties" className="hover:text-secondary transition-colors">
              Properties
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${
                        property.type === 'sale'
                          ? 'bg-secondary text-white'
                          : 'bg-primary-600 text-white'
                      }`}
                    >
                      For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    <span className="font-body text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                      {property.category}
                    </span>
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-body">{property.location}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={toggleSave}
                    className={`p-3 rounded-xl border transition-colors ${
                      isSaved
                        ? 'bg-red-50 border-red-300 text-red-600'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="font-display text-4xl font-bold text-secondary">
                  {property.price}
                  {property.type === 'rent' && (
                    <span className="text-lg text-gray-600 font-body">/month</span>
                  )}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Bed className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Bedrooms</p>
                    <p className="font-body font-semibold text-gray-900">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Bath className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Bathrooms</p>
                    <p className="font-body font-semibold text-gray-900">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Maximize className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Area</p>
                    <p className="font-body font-semibold text-gray-900">{property.sqft} sqft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Views</p>
                    <p className="font-body font-semibold text-gray-900">{property.views}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="font-body text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Location Details */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                  Location
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-sm text-gray-600">City</p>
                    <p className="font-body font-semibold text-gray-900">{property.city}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Subcity</p>
                    <p className="font-body font-semibold text-gray-900">{property.subcity}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Woreda</p>
                    <p className="font-body font-semibold text-gray-900">{property.woreda}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-gray-600">Kebele</p>
                    <p className="font-body font-semibold text-gray-900">{property.kebele}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.parking && (
                    <div className="flex items-center gap-2 font-body text-gray-700">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Parking Available
                    </div>
                  )}
                  {property.features.furnished && (
                    <div className="flex items-center gap-2 font-body text-gray-700">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Furnished
                    </div>
                  )}
                  {property.features.garden && (
                    <div className="flex items-center gap-2 font-body text-gray-700">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Garden
                    </div>
                  )}
                  {property.features.security && (
                    <div className="flex items-center gap-2 font-body text-gray-700">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      24/7 Security
                    </div>
                  )}
                </div>
              </div>

              {/* Posted Date */}
              <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="font-body text-sm">
                  Posted on {new Date(property.postedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OwnerCard 
              owner={property.owner} 
              onContactClick={() => setIsInquiryOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <SimilarProperties 
        properties={mockProperties} 
        currentPropertyId={property.id}
      />

      {/* Inquiry Form Modal */}
      <InquiryForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
      />
    </div>
  );
};

export default PropertyDetails;
