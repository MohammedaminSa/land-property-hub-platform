import { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    role: '',
    isApproved: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [filters])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.role) params.append('role', filters.role)
      if (filters.isApproved) params.append('isApproved', filters.isApproved)

      const { data } = await api.get(`/admin/users?${params}`)
      setUsers(data.data)
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/users/${id}/approve`)
      toast.success('User approved successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to approve user')
    }
  }

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this user?')) return

    try {
      await api.put(`/admin/users/${id}/reject`)
      toast.success('User rejected')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to reject user')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Manage Users</h1>
        <p className="text-gray-600">Approve or reject user accounts</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Filter by Role</label>
            <select
              className="input"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="landlord">Landlord</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <div>
            <label className="form-label">Filter by Status</label>
            <select
              className="input"
              value={filters.isApproved}
              onChange={(e) => setFilters({ ...filters, isApproved: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="true">Approved</option>
              <option value="false">Pending</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ role: '', isApproved: '' })}
              className="btn btn-secondary w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner w-12 h-12 mx-auto"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold">Name</th>
                  <th className="text-left py-4 px-4 font-bold">Email</th>
                  <th className="text-left py-4 px-4 font-bold">Phone</th>
                  <th className="text-left py-4 px-4 font-bold">Role</th>
                  <th className="text-left py-4 px-4 font-bold">Status</th>
                  <th className="text-left py-4 px-4 font-bold">Joined</th>
                  <th className="text-left py-4 px-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-semibold">{user.firstName} {user.lastName}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                    <td className="py-4 px-4 text-gray-600">{user.phone}</td>
                    <td className="py-4 px-4">
                      <span className="badge badge-primary capitalize">{user.role}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${user.isApproved ? 'badge-success' : 'badge-warning'}`}>
                        {user.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {!user.isApproved && user.role !== 'buyer' && user.role !== 'admin' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      ) : user.isApproved ? (
                        <span className="text-sm text-gray-500">No action needed</span>
                      ) : (
                        <span className="text-sm text-gray-500">Auto-approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageUsers
