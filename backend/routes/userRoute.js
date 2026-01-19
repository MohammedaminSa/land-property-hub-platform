const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/auth');

// Controllers
const { getUserProfile } = require('../controllers/userController');

// All routes are protected
router.use(protect);

// Routes
router.get('/profile', getUserProfile);

module.exports = router;