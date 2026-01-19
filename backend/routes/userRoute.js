const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'User profile endpoint - to be implemented'
  });
});

module.exports = router;