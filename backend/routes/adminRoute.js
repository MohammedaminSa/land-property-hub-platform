const express = require('express');
const router = express.Router();
const { getUsers, approveUser, approveProperty } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

// User management
router.get('/users', getUsers);
router.put('/users/:id/approve', approveUser);

// Property management
router.put('/properties/:id/approve', approveProperty);

module.exports = router;
