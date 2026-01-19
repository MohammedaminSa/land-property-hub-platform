// Centralized error messages for consistency
const ERROR_MESSAGES = {
  // Authentication errors
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User already exists with this email or phone number',
    USER_NOT_FOUND: 'User not found',
    NOT_AUTHORIZED: 'Not authorized to access this route',
    NO_TOKEN: 'Not authorized, no token provided',
    INVALID_TOKEN: 'Invalid token',
    TOKEN_EXPIRED: 'Token expired, please log in again',
    ACCOUNT_NOT_VERIFIED: 'Account verification required',
    ACCOUNT_NOT_APPROVED: 'Account approval required',
    WRONG_ROLE: 'User role is not authorized for this action'
  },

  // Property errors
  PROPERTY: {
    NOT_FOUND: 'Property not found',
    NOT_OWNER: 'Not authorized to modify this property',
    ALREADY_SOLD: 'Property has already been sold',
    ALREADY_RENTED: 'Property has already been rented',
    INVALID_STATUS: 'Invalid property status',
    APPROVAL_REQUIRED: 'Property requires admin approval'
  },

  // Inquiry errors
  INQUIRY: {
    NOT_FOUND: 'Inquiry not found',
    OWN_PROPERTY: 'You cannot inquire about your own property',
    NOT_AUTHORIZED: 'Not authorized to respond to this inquiry',
    ALREADY_RESPONDED: 'Inquiry has already been responded to'
  },

  // Validation errors
  VALIDATION: {
    REQUIRED_FIELDS: 'Please provide all required fields',
    INVALID_EMAIL: 'Please provide a valid email address',
    INVALID_PHONE: 'Please provide a valid Ethiopian phone number',
    PASSWORD_LENGTH: 'Password must be at least 6 characters',
    INVALID_ROLE: 'Invalid user role',
    INVALID_CATEGORY: 'Invalid property category',
    INVALID_PRICE: 'Price must be a positive number',
    INVALID_AREA: 'Area must be a positive number'
  },

  // File upload errors
  FILE: {
    TOO_LARGE: 'File size exceeds maximum limit',
    INVALID_TYPE: 'Invalid file type',
    UPLOAD_FAILED: 'File upload failed',
    NO_FILE: 'No file uploaded'
  },

  // Database errors
  DATABASE: {
    CONNECTION_ERROR: 'Database connection error',
    QUERY_ERROR: 'Database query error',
    DUPLICATE_ENTRY: 'Duplicate entry found'
  },

  // General errors
  GENERAL: {
    SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Bad request',
    FORBIDDEN: 'Access forbidden'
  }
};

module.exports = ERROR_MESSAGES;