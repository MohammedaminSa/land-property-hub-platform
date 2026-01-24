import { Link } from 'react-router-dom'

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/properties/${property._id}`}
      className="card hover:shadow-xl transition-shadow"
    >
      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
        {property.images?.[0] ? (
          <img
            src={`/uploads/properties/${property.images[0].filename}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
          {property.category.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{property.title}</h3>
      
      <div className="flex items-center text-gray-600 mb-2">
        <span className="text-2xl font-bold text-primary-600">
          {property.price.toLocaleString()} {property.currency}
        </span>
      </div>
      
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {property.location.city}, {property.location.subcity}
      </div>
      
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        {property.area.size} {property.area.unit}
      </div>
      
      {property.features?.bedrooms && (
        <div className="mt-2 text-sm text-gray-600">
          🛏️ {property.features.bedrooms} Beds • 🚿 {property.features.bathrooms} Baths
        </div>
      )}

      {property.views > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          👁️ {property.views} views
        </div>
      )}
    </Link>
  )
}

export default PropertyCard
