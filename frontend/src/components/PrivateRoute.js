import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // Check if user is approved (for sellers, landlords, agents)
  if (user?.role !== 'buyer' && user?.role !== 'admin' && !user?.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="text-yellow-500 text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Pending Approval</h2>
          <p className="text-gray-600">
            Your account is waiting for admin approval. You will be able to access all features once approved.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
