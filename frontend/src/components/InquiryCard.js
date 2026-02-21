import { MessageSquare, Calendar, User } from 'lucide-react';

const InquiryCard = ({ inquiry, onClick, type }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Pending
          </span>
        );
      case 'responded':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Responded
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Property Image */}
        <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
          <img
            src={inquiry.property.image}
            alt={inquiry.property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {getStatusBadge(inquiry.status)}
                <span className="text-xs text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
                {inquiry.property.title}
              </h3>
              <p className="font-body text-sm text-gray-600 mb-3">
                {inquiry.property.location}
              </p>
            </div>
          </div>

          {/* Message Preview */}
          <div className="mb-4">
            <p className="font-body text-gray-700 line-clamp-2">
              {inquiry.message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-body text-sm text-gray-600">
                  {type === 'sent'
                    ? `To: ${inquiry.property.owner.firstName} ${inquiry.property.owner.lastName}`
                    : `From: ${inquiry.buyer.firstName} ${inquiry.buyer.lastName}`}
                </span>
              </div>
            </div>
            <button className="text-secondary hover:text-secondary/80 font-body text-sm font-semibold transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
