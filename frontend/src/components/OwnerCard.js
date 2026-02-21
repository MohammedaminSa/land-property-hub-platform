import { Phone, Mail, User } from 'lucide-react';

const OwnerCard = ({ owner, onContactClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
      <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
        Contact Owner
      </h3>

      {/* Owner Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-primary-600" />
        </div>
        <div>
          <p className="font-body font-semibold text-gray-900">
            {owner.firstName} {owner.lastName}
          </p>
          <p className="font-body text-sm text-gray-500 capitalize">
            {owner.role}
          </p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <a
            href={`tel:${owner.phoneNumber}`}
            className="font-body text-gray-700 hover:text-secondary transition-colors"
          >
            {owner.phoneNumber}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <a
            href={`mailto:${owner.email}`}
            className="font-body text-gray-700 hover:text-secondary transition-colors break-all"
          >
            {owner.email}
          </a>
        </div>
      </div>

      {/* Contact Button */}
      <button
        onClick={onContactClick}
        className="w-full bg-secondary hover:bg-secondary/90 text-white font-body font-semibold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
      >
        Send Inquiry
      </button>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="font-body text-xs text-gray-500 text-center">
          Response time: Usually within 24 hours
        </p>
      </div>
    </div>
  );
};

export default OwnerCard;
