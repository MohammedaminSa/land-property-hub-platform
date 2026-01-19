const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getCurrentUser
} = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/signup', authController.signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.use(authController.protect);
router.route('/me').get(userControllers.getMe, userControllers.getUser);

module.exports = router;