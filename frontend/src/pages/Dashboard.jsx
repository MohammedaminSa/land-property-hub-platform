import { Routes, Route, Link, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import MyProperties from './dashboard/MyProperties'
import MyInquiries from './dashboard/MyInquiries'
import Profile from './dashboard/Profile'

const Dashboard = () => {
  const { user } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-6">
              <div className="text-sm text-gray-600">Welcome back,</div>
              <div className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className={`block px-4 py-2 rounded-lg ${
                  location.pathname === '/dashboard'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                📊 Overview
              </Link>

              {['seller', 'landlord', 'agent'].includes(user?.role) && (
                <Link
                  to="/dashboard/properties"
                  className={`block px-4 py-2 rounded-lg ${
                    isActive('/dashboard/properties')
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  🏠 My Properties
                </Link>
              )}

              <Link
                to="/dashboard/inquiries"
                className={`block px-4 py-2 rounded-lg ${
                  isActive('/dashboard/inquiries')
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                💬 Inquiries
              </Link>

              <Link
                to="/dashboard/profile"
                className={`block px-4 py-2 rounded-lg ${
                  isActive('/dashboard/profile')
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                👤 Profile
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="properties" element={<MyProperties />} />
            <Route path="inquiries" element={<MyInquiries />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

const DashboardOverview = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-600">
          Manage your properties, inquiries, and profile from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Properties</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-2">💬</div>
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Inquiries</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-2">👁️</div>
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Views</div>
        </div>
      </div>

      {!user?.isApproved && ['seller', 'landlord', 'agent'].includes(user?.role) && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <div className="flex items-start">
            <div className="text-2xl mr-4">⚠️</div>
            <div>
              <h3 className="font-semibold mb-2">Account Pending Approval</h3>
              <p className="text-gray-700">
                Your account is pending admin approval. You'll be able to list properties once approved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard