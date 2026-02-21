import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import InquiryCard from '../components/InquiryCard';
import InquiryDetailsModal from '../components/InquiryDetailsModal';
import { getInquiries } from '../services/inquiryService';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';
import property4 from '../assets/property-4.jpg';

// Mock data for testing
const mockSentInquiries = [
  {
    _id: 'inq-1',
    property: {
      _id: 'prop-1',
      title: 'Modern City Apartment',
      location: 'Bole, Addis Ababa',
      price: 'ETB 2,400,000',
      image: property1,
      owner: {
        firstName: 'Abebe',
        lastName: 'Kebede',
        role: 'seller',
        email: 'abebe@example.com',
      },
    },
    buyer: {
      firstName: 'John',
      lastName: 'Doe',
      role: 'buyer',
    },
    message: 'Hi, I am interested in this property. Can we schedule a viewing?',
    phoneNumber: '+251 911 234 567',
    status: 'responded',
    response: 'Hello! Thank you for your interest. I would be happy to arrange a viewing. Please call me at your convenience.',
    createdAt: '2024-01-20T10:30:00Z',
    respondedAt: '2024-01-21T14:20:00Z',
  },
  {
    _id: 'inq-2',
    property: {
      _id: 'prop-2',
      title: 'Luxury Condo Tower',
      location: 'CMC, Addis Ababa',
      price: 'ETB 12,500,000',
      image: property3,
      owner: {
        firstName: 'Tigist',
        lastName: 'Haile',
        role: 'agent',
        email: 'tigist@example.com',
      },
    },
    buyer: {
      firstName: 'John',
      lastName: 'Doe',
      role: 'buyer',
    },
    message: 'Is this property still available? What are the payment terms?',
    phoneNumber: '+251 911 234 567',
    status: 'pending',
    createdAt: '2024-01-22T15:45:00Z',
  },
];

const mockReceivedInquiries = [
  {
    _id: 'inq-3',
    property: {
      _id: 'prop-3',
      title: 'Charming Family Home',
      location: 'Kazanchis, Addis Ababa',
      price: 'ETB 4,850,000',
      image: property2,
      owner: {
        firstName: 'Current',
        lastName: 'User',
        role: 'seller',
        email: 'user@example.com',
      },
    },
    buyer: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'buyer',
      email: 'sarah@example.com',
    },
    message: 'Hello, I would like to know more about this property. Is it negotiable?',
    phoneNumber: '+251 912 345 678',
    status: 'pending',
    createdAt: '2024-01-23T09:15:00Z',
  },
  {
    _id: 'inq-4',
    property: {
      _id: 'prop-4',
      title: 'Cozy Apartment',
      location: 'Megenagna, Addis Ababa',
      price: 'ETB 18,000',
      image: property4,
      owner: {
        firstName: 'Current',
        lastName: 'User',
        role: 'landlord',
        email: 'user@example.com',
      },
    },
    buyer: {
      firstName: 'Michael',
      lastName: 'Brown',
      role: 'buyer',
      email: 'michael@example.com',
    },
    message: 'Is this apartment pet-friendly? When is the earliest move-in date?',
    phoneNumber: '+251 913 456 789',
    status: 'responded',
    response: 'Yes, pets are allowed with a small deposit. You can move in as early as next week.',
    createdAt: '2024-01-19T11:20:00Z',
    respondedAt: '2024-01-19T16:30:00Z',
  },
];

const Inquiries = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('sent');
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine if user can receive inquiries
  const canReceiveInquiries = ['seller', 'landlord', 'agent'].includes(user?.role);

  useEffect(() => {
    fetchInquiries();
  }, [activeTab]);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, searchQuery, statusFilter]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with real API call
      // const response = await getInquiries(activeTab);
      // setInquiries(response.data);

      // For now, use mock data
      setTimeout(() => {
        if (activeTab === 'sent') {
          setInquiries(mockSentInquiries);
        } else {
          setInquiries(mockReceivedInquiries);
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load inquiries');
      setLoading(false);
    }
  };

  const filterInquiries = () => {
    let filtered = [...inquiries];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((inq) => inq.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inq) =>
          inq.property.title.toLowerCase().includes(query) ||
          inq.message.toLowerCase().includes(query) ||
          (activeTab === 'sent'
            ? `${inq.property.owner.firstName} ${inq.property.owner.lastName}`
            : `${inq.buyer.firstName} ${inq.buyer.lastName}`
          )
            .toLowerCase()
            .includes(query)
      );
    }

    setFilteredInquiries(filtered);
  };

  const handleInquiryClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  const handleInquiryUpdate = () => {
    fetchInquiries();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Inquiries
          </h1>
          <p className="font-body text-gray-600">
            Manage your property inquiries
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 px-6 py-4 font-body font-semibold transition-colors ${
                  activeTab === 'sent'
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sent Inquiries
              </button>
              {canReceiveInquiries && (
                <button
                  onClick={() => setActiveTab('received')}
                  className={`flex-1 px-6 py-4 font-body font-semibold transition-colors ${
                    activeTab === 'received'
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Received Inquiries
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredInquiries.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== 'all'
                ? 'No Inquiries Found'
                : activeTab === 'sent'
                ? 'No Sent Inquiries'
                : 'No Received Inquiries'}
            </h3>
            <p className="font-body text-gray-600">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : activeTab === 'sent'
                ? 'Start browsing properties and send inquiries to sellers'
                : 'You will see inquiries here when buyers contact you about your properties'}
            </p>
          </div>
        )}

        {/* Inquiries List */}
        {!loading && !error && filteredInquiries.length > 0 && (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry._id}
                inquiry={inquiry}
                onClick={() => handleInquiryClick(inquiry)}
                type={activeTab}
              />
            ))}
          </div>
        )}

        {/* Inquiry Details Modal */}
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          type={activeTab}
          onUpdate={handleInquiryUpdate}
        />
      </div>
    </div>
  );
};

export default Inquiries;
