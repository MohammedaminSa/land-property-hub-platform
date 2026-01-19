const { body } = require('express-validator');

// Validation rules for creating an inquiry
exports.createInquiryValidation = [
  body('property')
    .isMongoId()
    .withMessage('Valid property ID is required'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be between 10 and 500 characters')
];

// Validation rules for responding to an inquiry
exports.respondInquiryValidation = [
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Response must be between 10 and 500 characters')
];