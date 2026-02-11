const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getUsers,
  approveUser,
  deleteUser,
  getProperties,
  approveProperty,
  rejectProperty
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getDashboard);

// User management
router.get('/users', getUsers);
router.put('/users/:id/approve', approveUser);
router.delete('/users/:id', deleteUser);

// Property management
router.get('/properties', getProperties);
router.put('/properties/:id/approve', approveProperty);
router.put('/properties/:id/reject', rejectProperty);

module.exports = router;
