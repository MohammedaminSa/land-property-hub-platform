import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Role: <span className="font-semibold capitalize">{user?.role}</span>
          </p>
          {user?.role !== 'buyer' && user?.role !== 'admin' && (
            <p className="text-sm mt-1">
              Status: {user?.isApproved ? (
                <span className="text-green-600 font-semibold">✓ Approved</span>
              ) : (
                <span className="text-yellow-600 font-semibold">⏳ Pending Approval</span>
              )}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Browse Properties */}
          <Link
            to="/properties"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🏘️</div>
            <h3 className="text-xl font-semibold mb-2">Browse Properties</h3>
            <p className="text-gray-600">
              Search and filter properties across Ethiopia
            </p>
          </Link>

          {/* My Properties - Only for sellers, landlords, agents */}
          {(user?.role === 'seller' || user?.role === 'landlord' || user?.role === 'agent') && (
            <Link
              to="/my-properties"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">My Properties</h3>
              <p className="text-gray-600">
                View and manage your property listings
              </p>
            </Link>
          )}

          {/* Add Property - Only for approved sellers, landlords, agents */}
          {(user?.role === 'seller' || user?.role === 'landlord' || user?.role === 'agent') && user?.isApproved && (
            <Link
              to="/add-property"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-semibold mb-2">Add Property</h3>
              <p className="text-gray-600">
                List a new property for sale or rent
              </p>
            </Link>
          )}

          {/* Inquiries */}
          <Link
            to="/inquiries"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Inquiries</h3>
            <p className="text-gray-600">
              {user?.role === 'buyer' 
                ? 'View your sent inquiries'
                : 'Manage property inquiries'}
            </p>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">My Profile</h3>
            <p className="text-gray-600">
              Update your account information
            </p>
          </Link>
        </div>

        {/* Pending Approval Message */}
        {user?.role !== 'buyer' && user?.role !== 'admin' && !user?.isApproved && (
          <div className="mt-8 bg-yellow-50 border border-yellow-400 rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-3xl mr-4">⏳</div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Account Pending Approval
                </h3>
                <p className="text-yellow-700">
                  Your account is waiting for admin approval. Once approved, you will be able to:
                </p>
                <ul className="list-disc list-inside mt-2 text-yellow-700">
                  <li>Create property listings</li>
                  <li>Upload property images</li>
                  <li>Receive and respond to inquiries</li>
                </ul>
                <p className="mt-3 text-sm text-yellow-600">
                  This usually takes 24-48 hours. You will receive an email notification once approved.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
