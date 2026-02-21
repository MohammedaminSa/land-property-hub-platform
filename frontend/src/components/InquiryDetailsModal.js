import { useState } from 'react';
import { X, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';
import { updateInquiry } from '../services/inquiryService';

const InquiryDetailsModal = ({ inquiry, isOpen, onClose, type, onUpdate }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);

  if (!isOpen || !inquiry) return null;

  const handleRespond = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateInquiry(inquiry._id, {
        response,
        status: 'responded',
      });

      onUpdate();
      setShowResponseForm(false);
      setResponse('');
      alert('Response sent successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send response');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    if (window.confirm('Are you sure you want to close this inquiry?')) {
      try {
        await updateInquiry(inquiry._id, { status: 'closed' });
        onUpdate();
        alert('Inquiry closed successfully!');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to close inquiry');
      }
    }
  };

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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-gray-900">
              Inquiry Details
            </h2>
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(inquiry.status)}
              <span className="text-sm text-gray-500">
                {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex gap-4">
              <img
                src={inquiry.property.image}
                alt={inquiry.property.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
                  {inquiry.property.title}
                </h3>
                <p className="font-body text-sm text-gray-600 mb-2">
                  {inquiry.property.location}
                </p>
                <p className="font-display text-xl font-bold text-secondary">
                  {inquiry.property.price}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
              {type === 'sent' ? 'Property Owner' : 'Buyer Information'}
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="font-display text-lg font-semibold text-primary-600">
                    {type === 'sent'
                      ? inquiry.property.owner.firstName[0]
                      : inquiry.buyer.firstName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-gray-900">
                    {type === 'sent'
                      ? `${inquiry.property.owner.firstName} ${inquiry.property.owner.lastName}`
                      : `${inquiry.buyer.firstName} ${inquiry.buyer.lastName}`}
                  </p>
                  <p className="font-body text-sm text-gray-600 capitalize">
                    {type === 'sent' ? inquiry.property.owner.role : inquiry.buyer.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <a
                  href={`tel:${inquiry.phoneNumber}`}
                  className="font-body hover:text-secondary transition-colors"
                >
                  {inquiry.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <a
                  href={`mailto:${type === 'sent' ? inquiry.property.owner.email : inquiry.buyer.email}`}
                  className="font-body hover:text-secondary transition-colors break-all"
                >
                  {type === 'sent' ? inquiry.property.owner.email : inquiry.buyer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Original Message */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
              Message
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-body text-gray-700 whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>
          </div>

          {/* Response (if exists) */}
          {inquiry.response && (
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                Response
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-body text-gray-700 whitespace-pre-wrap">
                  {inquiry.response}
                </p>
                {inquiry.respondedAt && (
                  <p className="font-body text-xs text-gray-500 mt-3">
                    Responded on{' '}
                    {new Date(inquiry.respondedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Response Form (for received inquiries) */}
          {type === 'received' && inquiry.status !== 'closed' && !showResponseForm && !inquiry.response && (
            <button
              onClick={() => setShowResponseForm(true)}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-body font-semibold py-3 rounded-xl transition-colors"
            >
              Respond to Inquiry
            </button>
          )}

          {showResponseForm && (
            <form onSubmit={handleRespond} className="space-y-4">
              <div>
                <label className="block font-body font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowResponseForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-body font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-body font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </form>
          )}

          {/* Close Inquiry Button */}
          {type === 'received' && inquiry.status !== 'closed' && (
            <button
              onClick={handleClose}
              className="w-full border border-gray-300 text-gray-700 font-body font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Close Inquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailsModal;
