import { Link } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize, Eye, MessageSquare, 
  Edit, Trash2, MoreVertical 
} from 'lucide-react';
import { useState } from 'react';

const MyPropertyCard = ({ property, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            {getStatusBadge(property.status)}
          </div>
          <span
            className={`absolute top-3 right-3 font-body text-xs font-semibold px-3 py-1 rounded-full ${
              property.type === 'sale'
                ? 'bg-secondary text-white'
                : 'bg-primary-600 text-white'
            }`}
          >
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link
                to={`/properties/${property.id}`}
                className="font-display text-xl font-semibold text-gray-900 hover:text-secondary transition-colors"
              >
                {property.title}
              </Link>
              <div className="flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-body text-sm text-gray-500">
                  {property.location}
                </span>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    <Link
                      to={`/properties/${property.id}/edit`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors font-body text-gray-700"
                      onClick={() => setShowMenu(false)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit Property
                    </Link>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        if (window.confirm('Are you sure you want to delete this property?')) {
                          onDelete(property.id);
                        }
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors font-body text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Property
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Price */}
          <p className="font-display text-2xl font-bold text-secondary mb-4">
            {property.price}
            {property.type === 'rent' && (
              <span className="text-sm text-gray-600 font-body">/month</span>
            )}
          </p>

          {/* Features */}
          <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-gray-500" />
              <span className="font-body text-sm text-gray-600">
                {property.beds} Beds
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-gray-500" />
              <span className="font-body text-sm text-gray-600">
                {property.baths} Baths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-gray-500" />
              <span className="font-body text-sm text-gray-600">
                {property.sqft} sqft
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="font-body text-sm text-gray-600">
                {property.views || 0} views
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="font-body text-sm text-gray-600">
                {property.inquiries || 0} inquiries
              </span>
            </div>
            <span className="font-body text-xs text-gray-500 ml-auto">
              Posted {new Date(property.postedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPropertyCard;
