import { useState, useEffect } from 'react';
import { Search, Filter, Check, X, Trash2, User } from 'lucide-react';
import { getAllUsers, approveUser, deleteUser } from '../services/adminService';

// Mock data
const mockUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+251 911 234 567',
    role: 'seller',
    isApproved: false,
    createdAt: '2024-01-23T10:30:00Z',
  },
  {
    _id: '2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah@example.com',
    phoneNumber: '+251 912 345 678',
    role: 'landlord',
    isApproved: true,
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    _id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael@example.com',
    phoneNumber: '+251 913 456 789',
    role: 'agent',
    isApproved: false,
    createdAt: '2024-01-22T16:45:00Z',
  },
  {
    _id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily@example.com',
    phoneNumber: '+251 914 567 890',
    role: 'buyer',
    isApproved: true,
    createdAt: '2024-01-18T14:20:00Z',
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with real API call
      // const response = await getAllUsers();
      // setUsers(response.data);

      // For now, use mock data
      setTimeout(() => {
        setUsers(mockUsers);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter === 'approved') {
      filtered = filtered.filter((u) => u.isApproved);
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter((u) => !u.isApproved && u.role !== 'buyer');
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(query) ||
          u.lastName.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleApprove = async (userId) => {
    try {
      // TODO: Replace with real API call
      // await approveUser(userId);

      // Update local state
      setUsers(users.map(u => 
        u._id === userId ? { ...u, isApproved: true } : u
      ));
      alert('User approved successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve user');
    }
  };

  const handleReject = async (userId) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      try {
        // TODO: Replace with real API call
        // await rejectUser(userId);

        // Update local state
        setUsers(users.map(u => 
          u._id === userId ? { ...u, isApproved: false } : u
        ));
        alert('User rejected successfully!');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to reject user');
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // TODO: Replace with real API call
        // await deleteUser(userId);

        // Update local state
        setUsers(users.filter(u => u._id !== userId));
        alert('User deleted successfully!');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="font-body text-gray-600">
            Manage user accounts and approvals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
              >
                <option value="all">All Roles</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="landlord">Landlord</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
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
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
              No Users Found
            </h3>
            <p className="font-body text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-body text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th className="px-6 py-4 text-left font-body text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left font-body text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left font-body text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-body text-sm font-semibold text-gray-900">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right font-body text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-body font-semibold text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="font-body text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-gray-900">
                          {user.phoneNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'buyer' || user.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            N/A
                          </span>
                        ) : user.isApproved ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            <Check className="w-3 h-3" />
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                            <X className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {user.role !== 'buyer' && user.role !== 'admin' && !user.isApproved && (
                            <button
                              onClick={() => handleApprove(user._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          {user.role !== 'buyer' && user.role !== 'admin' && user.isApproved && (
                            <button
                              onClick={() => handleReject(user._id)}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
