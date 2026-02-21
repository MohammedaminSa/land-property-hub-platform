import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = '🏠', 
  title = 'No properties found', 
  message = 'Try adjusting your filters or search criteria',
  actionText,
  actionLink 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="text-8xl mb-6">{icon}</div>
      <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="font-body text-gray-600 mb-6 max-w-md">{message}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
