import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Home, MessageSquare, Clock, CheckCircle, 
  XCircle, TrendingUp, Activity 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { getDashboardStats } from '../services/adminService';

// Mock data
const mockStats = {
  totalUsers: 1247,
  totalProperties: 856,
  pendingProperties: 23,
  approvedProperties: 789,
  rejectedProperties: 44,
  totalInquiries: 3421,
  pendingUsers: 15,
  activeUsers: 1232,
};

const mockRecentUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'seller',
    isApproved: false,
    createdAt: '2024-01-23T10:30:00Z',
  },
  {
    _id: '2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah@example.com',
    role: 'landlord',
    isApproved: false,
    createdAt: '2024-01-23T09:15:00Z',
  },
  {
    _id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael@example.com',
    role: 'agent',
    isApproved: false,
    createdAt: '2024-01-22T16:45:00Z',
  },
];

const mockRecentProperties = [
  {
    _id: '1',
    title: 'Modern Apartment in Bole',
    owner: { firstName: 'Alice', lastName: 'Brown' },
    status: 'pending',
    createdAt: '2024-01-23T11:20:00Z',
  },
  {
    _id: '2',
    title: 'Luxury Villa in Old Airport',
    owner: { firstName: 'Bob', lastName: 'Wilson' },
    status: 'pending',
    createdAt: '2024-01-23T08:30:00Z',
  },
  {
    _id: '3',
    title: 'Commercial Space in CMC',
    owner: { firstName: 'Carol', lastName: 'Davis' },
    status: 'pending',
    createdAt: '2024-01-22T14:10:00Z',
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [recentUsers, setRecentUsers] = useState(mockRecentUsers);
  const [recentProperties, setRecentProperties] = useState(mockRecentProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await getDashboardStats();
      // setStats(response.data.stats);
      // setRecentUsers(response.data.recentUsers);
      // setRecentProperties(response.data.recentProperties);
      
      // For now, use mock data
      setTimeout(() => {
        setStats(mockStats);
        setRecentUsers(mockRecentUsers);
        setRecentProperties(mockRecentProperties);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="font-body text-gray-600">
            Overview of platform statistics and activity
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            color="bg-blue-50 text-blue-600"
            trend={12}
          />
          <StatCard
            icon={Home}
            label="Total Properties"
            value={stats.totalProperties}
            color="bg-green-50 text-green-600"
            trend={8}
          />
          <StatCard
            icon={Clock}
            label="Pending Approvals"
            value={stats.pendingProperties + stats.pendingUsers}
            color="bg-yellow-50 text-yellow-600"
          />
          <StatCard
            icon={MessageSquare}
            label="Total Inquiries"
            value={stats.totalInquiries}
            color="bg-purple-50 text-purple-600"
            trend={15}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                Properties Status
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-body text-sm text-gray-600">Approved</span>
                </div>
                <span className="font-body font-semibold text-gray-900">
                  {stats.approvedProperties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-body text-sm text-gray-600">Pending</span>
                </div>
                <span className="font-body font-semibold text-gray-900">
                  {stats.pendingProperties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="font-body text-sm text-gray-600">Rejected</span>
                </div>
                <span className="font-body font-semibold text-gray-900">
                  {stats.rejectedProperties}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                Users Status
              </h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-body text-sm text-gray-600">Active</span>
                </div>
                <span className="font-body font-semibold text-gray-900">
                  {stats.activeUsers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-body text-sm text-gray-600">Pending</span>
                </div>
                <span className="font-body font-semibold text-gray-900">
                  {stats.pendingUsers}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/users"
                className="block w-full text-left px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-body text-sm font-semibold"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/properties"
                className="block w-full text-left px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors font-body text-sm font-semibold"
              >
                Manage Properties
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent User Registrations */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                Recent User Registrations
              </h3>
              <Link
                to="/admin/users"
                className="font-body text-sm text-secondary hover:text-secondary/80 font-semibold"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="font-display text-sm font-semibold text-primary-600">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="font-body text-xs text-gray-500 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Property Submissions */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                Recent Property Submissions
              </h3>
              <Link
                to="/admin/properties"
                className="font-body text-sm text-secondary hover:text-secondary/80 font-semibold"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div
                    key={property._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-body font-semibold text-gray-900 mb-1">
                        {property.title}
                      </p>
                      <p className="font-body text-xs text-gray-500">
                        by {property.owner.firstName} {property.owner.lastName}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
