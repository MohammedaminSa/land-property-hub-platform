const express = require('express');
const router = express.Router();
const { sendInquiry, getInquiries, updateInquiry } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.post('/', sendInquiry);
router.get('/', getInquiries);
router.put('/:id', updateInquiry);

module.exports = router;
