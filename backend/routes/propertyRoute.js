const express = require('express');
const router = express.Router();

// Middleware
const { protect, authorize, requireApproved } = require('../middleware/auth');

// Validators
const { getPropertiesValidation, createPropertyValidation } = require('../validators/propertyValidator');

// Controllers
const {
  getProperties,
  getPropertyById,
  createProperty,
  getMyProperties
} = require('../controllers/propertyController');

// Public routes
router.get('/', getPropertiesValidation, getProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.use(protect);
router.get('/my/listings', getMyProperties);
router.post('/', authorize('seller', 'landlord', 'agent'), requireApproved, createPropertyValidation, createProperty);

module.exports = router;