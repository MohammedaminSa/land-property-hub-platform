const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  createInquiry,
  getReceivedInquiries,
  getSentInquiries,
  respondToInquiry
} = require('../controllers/inquiryController');

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create new inquiry
// @access  Private
router.post('/', [
  protect,
  body('property').isMongoId().withMessage('Valid property ID is required'),
  body('subject').trim().isLength({ min: 5, max: 100 }).withMessage('Subject must be between 5 and 100 characters'),
  body('message').trim().isLength({ min: 10, max: 500 }).withMessage('Message must be between 10 and 500 characters')
], createInquiry);

// @route   GET /api/inquiries/received
// @desc    Get inquiries received by current user
// @access  Private
router.get('/received', protect, getReceivedInquiries);

// @route   GET /api/inquiries/sent
// @desc    Get inquiries sent by current user
// @access  Private
router.get('/sent', protect, getSentInquiries);

// @route   PUT /api/inquiries/:id/respond
// @desc    Respond to an inquiry
// @access  Private
router.put('/:id/respond', [
  protect,
  body('message').trim().isLength({ min: 10, max: 500 }).withMessage('Response must be between 10 and 500 characters')
], respondToInquiry);

module.exports = router;