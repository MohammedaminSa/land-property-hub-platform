const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  uploadImages
} = require('../controllers/propertyController');
const { protect, authorize, checkApproval } = require('../middleware/authMiddleware');
const { uploadImages: uploadMiddleware } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getProperties);
router.get('/:id', getProperty);

// Protected routes
router.use(protect);

// My properties - must come before /:id to avoid conflict
router.get('/my/listings', getMyProperties);

// Create property - only sellers, landlords, agents (must be approved)
router.post('/', authorize('seller', 'landlord', 'agent'), checkApproval, createProperty);

// Upload images
router.post('/:id/images', uploadMiddleware, uploadImages);

// Update and delete - owner only
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
