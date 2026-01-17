const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Placeholder for admin routes
// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard endpoint - to be implemented'
  });
});

module.exports = router;