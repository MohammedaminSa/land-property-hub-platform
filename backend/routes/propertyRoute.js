const express = require('express');
const router = express.Router();

// Middleware
const { protect, authorize, requireApproved } = require('../middleware/auth');
const { uploadPropertyImages } = require('../middleware/upload');

// Validators
const { getPropertiesValidation, createPropertyValidation } = require('../validators/propertyValidator');

// Controllers
const {
  getProperties,
  getPropertyById,
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  uploadPropertyImages: uploadImages
} = require('../controllers/propertyController');

// Public routes
router.get('/', getPropertiesValidation, getProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.use(protect);
router.get('/my/listings', getMyProperties);
router.post('/', authorize('seller', 'landlord', 'agent'), requireApproved, createPropertyValidation, createProperty);
router.put('/:id', authorize('seller', 'landlord', 'agent'), updateProperty);
router.delete('/:id', authorize('seller', 'landlord', 'agent'), deleteProperty);
router.post('/:id/images', authorize('seller', 'landlord', 'agent'), uploadPropertyImages, uploadImages);

module.exports = router;