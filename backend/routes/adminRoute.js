const express = require('express');
const router = express.Router();

// Middleware
const { protect, authorize } = require('../middleware/auth');

// Controllers
const { getAdminDashboard } = require('../controllers/adminController');

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

// Routes
router.get('/dashboard', getAdminDashboard);

module.exports = router;