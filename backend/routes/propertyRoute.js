const express = require('express');
const { body, query } = require('express-validator');
const { protect, authorize, requireApproved } = require('../middleware/auth');
const {
  getProperties,
  getPropertyById,
  createProperty,
  getMyProperties
} = require('../controllers/propertyController');

const router = express.Router();

// @route   GET /api/properties
// @desc    Get all approved properties with filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isNumeric().withMessage('Min price must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('Max price must be a number')
], getProperties);

// @route   GET /api/properties/:id
// @desc    Get single property by ID
// @access  Public
router.get('/:id', getPropertyById);

// @route   POST /api/properties
// @desc    Create new property
// @access  Private (Seller, Landlord, Agent)
router.post('/', [
  protect,
  authorize('seller', 'landlord', 'agent'),
  requireApproved,
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('category').isIn(['residential_land', 'apartment_sale', 'house_rent']).withMessage('Invalid category'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('area.size').isNumeric().withMessage('Area size must be a number'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.subcity').trim().notEmpty().withMessage('Subcity is required')
], createProperty);

// @route   GET /api/properties/my/listings
// @desc    Get current user's properties
// @access  Private
router.get('/my/listings', protect, getMyProperties);

module.exports = router;