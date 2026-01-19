const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getAdminDashboard } = require('../controllers/adminController');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);

module.exports = router;