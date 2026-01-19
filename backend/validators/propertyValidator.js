const { body, query } = require('express-validator');

// Validation rules for getting properties with filters
const getPropertiesValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  
  query('minPrice')
    .optional()
    .isNumeric()
    .withMessage('Min price must be a number'),
  
  query('maxPrice')
    .optional()
    .isNumeric()
    .withMessage('Max price must be a number')
];

// Validation rules for creating a property
const createPropertyValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  
  body('category')
    .isIn(['residential_land', 'apartment_sale', 'house_rent'])
    .withMessage('Invalid category'),
  
  body('price')
    .isNumeric()
    .withMessage('Price must be a number'),
  
  body('area.size')
    .isNumeric()
    .withMessage('Area size must be a number'),
  
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('location.subcity')
    .trim()
    .notEmpty()
    .withMessage('Subcity is required')
];

module.exports = {
  getPropertiesValidation,
  createPropertyValidation
};