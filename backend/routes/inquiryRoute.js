const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/auth');

// Validators
const { createInquiryValidation, respondInquiryValidation } = require('../validators/inquiryValidator');

// Controllers
const {
  createInquiry,
  getReceivedInquiries,
  getSentInquiries,
  respondToInquiry
} = require('../controllers/inquiryController');

// All routes are protected
router.use(protect);

// Routes
router.post('/', createInquiryValidation, createInquiry);
router.get('/received', getReceivedInquiries);
router.get('/sent', getSentInquiries);
router.put('/:id/respond', respondInquiryValidation, respondToInquiry);

module.exports = router;