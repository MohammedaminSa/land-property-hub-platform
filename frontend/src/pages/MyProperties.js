import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import PropertyStats from '../components/PropertyStats';
import MyPropertyCard from '../components/MyPropertyCard';
import { getMyProperties, deleteProperty } from '../services/propertyService';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';
import property4 from '../assets/property-4.jpg';

// Mock data for testing
const mockProperties = [
  {
    id: 'my-1',
    image: property1,
    title: 'Modern City Apartment',
    location: 'Bole, Addis Ababa',
    price: 'ETB 2,400,000',
    beds: 2,
    baths: 1,
    sqft: '1,100',
    type: 'sale',
    status: 'approved',
    views: 245,
    inquiries: 12,
    postedDate: '2024-01-15',
  },
  {
    id: 'my-2',
    image: property2,
    title: 'Charming Family Home',
    location: 'Kazanchis, Addis Ababa',
    price: 'ETB 4,850,000',
    beds: 4,
    baths: 3,
    sqft: '2,800',
    type: 'sale',
    status: 'pending',
    views: 89,
    inquiries: 5,
    postedDate: '2024-01-20',
  },
  {
    id: 'my-3',
    image: property3,
    title: 'Luxury Condo Tower',
    location: 'CMC, Addis Ababa',
    price: 'ETB 12,500,000',
    beds: 3,
    baths: 2,
    sqft: '1,950',
    type: 'sale',
    status: 'approved',
    views: 412,
    inquiries: 28,
    postedDate: '2024-01-10',
  },
  {
    id: 'my-4',
    image: property4,
    title: 'Cozy Apartment',
    location: 'Megenagna, Addis Ababa',
    price: 'ETB 18,000',
    beds: 3,
    baths: 2,
    sqft: '1,600',
    type: 'rent',
    status: 'rejected',
    views: 56,
    inquiries: 2,
    postedDate: '2024-01-18',
  },
];

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    totalViews: 0,
    totalInquiries: 0,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, statusFilter]);

  const fetchProperties = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with real API call
      // const response = await getMyProperties();
      // setProperties(response.data);

      // For now, use mock data
      setTimeout(() => {
        setProperties(mockProperties);
        calculateStats(mockProperties);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load properties');
      setLoading(false);
    }
  };

  const calculateStats = (props) => {
    const stats = {
      total: props.length,
      approved: props.filter((p) => p.status === 'approved').length,
      pending: props.filter((p) => p.status === 'pending').length,
      totalViews: props.reduce((sum, p) => sum + (p.views || 0), 0),
      totalInquiries: props.reduce((sum, p) => sum + (p.inquiries || 0), 0),
    };
    setStats(stats);
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleDelete = async (id) => {
    try {
      // TODO: Replace with real API call
      // await deleteProperty(id);

      // For now, just remove from state
      const updatedProperties = properties.filter((p) => p.id !== id);
      setProperties(updatedProperties);
      calculateStats(updatedProperties);
      alert('Property deleted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
              My Properties
            </h1>
            <p className="font-body text-gray-600">
              Manage your property listings
            </p>
          </div>
          <Link
            to="/add-property"
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl font-body font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </Link>
        </div>

        {/* Statistics */}
        <PropertyStats stats={stats} />

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
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
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== 'all'
                ? 'No Properties Found'
                : 'No Properties Yet'}
            </h3>
            <p className="font-body text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first property listing'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link
                to="/add-property"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl font-body font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Your First Property
              </Link>
            )}
          </div>
        )}

        {/* Properties List */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div className="space-y-6">
            {filteredProperties.map((property) => (
              <MyPropertyCard
                key={property.id}
                property={property}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
