import { useState } from 'react';
import { X } from 'lucide-react';
import { createInquiry } from '../services/inquiryService';

const InquiryForm = ({ isOpen, onClose, propertyId, propertyTitle }) => {
  const [formData, setFormData] = useState({
    message: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createInquiry({
        property: propertyId,
        message: formData.message,
        phoneNumber: formData.phoneNumber,
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ message: '', phoneNumber: '' });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="font-display text-2xl font-semibold text-gray-900">
              Send Inquiry
            </h2>
            <p className="font-body text-sm text-gray-600 mt-1">
              About: {propertyTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
              Inquiry sent successfully! The owner will contact you soon.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block font-body font-medium text-gray-700 mb-2">
              Your Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+251 912 345 678"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-body font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="I'm interested in this property. Please provide more details..."
              rows="5"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-body text-sm text-blue-800">
              💡 The property owner will receive your inquiry and contact you directly via phone or email.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-body font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-body font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
