import { Link } from 'react-router-dom'

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/properties/${property._id}`}
      className="property-card animate-fade-in"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {property.images?.[0] ? (
          <img
            src={`/uploads/properties/${property.images[0].filename}`}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary backdrop-blur-sm bg-white/90 shadow-lg">
            {property.category.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Views Badge */}
        {property.views > 0 && (
          <div className="absolute top-4 right-4">
            <span className="badge bg-black/60 text-white backdrop-blur-sm">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {property.views}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h3>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold gradient-text">
            {property.price.toLocaleString()}
          </span>
          <span className="text-lg font-semibold text-gray-600 ml-1">
            {property.currency}
          </span>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">{property.location.city}, {property.location.subcity}</span>
        </div>
        
        {/* Area */}
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span className="font-medium">{property.area.size} {property.area.unit}</span>
        </div>
        
        {/* Features */}
        {property.features?.bedrooms && (
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-1.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold">{property.features.bedrooms}</span>
              <span className="text-sm ml-1">Beds</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-1.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span className="font-semibold">{property.features.bathrooms}</span>
              <span className="text-sm ml-1">Baths</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PropertyCard
