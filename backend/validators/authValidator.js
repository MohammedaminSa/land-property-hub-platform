const { body } = require('express-validator');

// Validation rules for user registration
exports.registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('phone')
    .matches(/^(\+251|0)[0-9]{9}$/)
    .withMessage('Please enter a valid Ethiopian phone number'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  body('role')
    .isIn(['buyer', 'seller', 'landlord', 'agent'])
    .withMessage('Invalid role')
];

// Validation rules for user login
exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .exists()
    .withMessage('Password is required')
];

