const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/auth');
const { uploadProfileImage, uploadVerificationDocuments } = require('../middleware/upload');

// Controllers
const {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage: uploadProfile,
  uploadVerificationDocuments: uploadDocs
} = require('../controllers/userController');

// All routes are protected
router.use(protect);

// Routes
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.post('/profile/image', uploadProfileImage, uploadProfile);
router.post('/verification/documents', uploadVerificationDocuments, uploadDocs);

module.exports = router;