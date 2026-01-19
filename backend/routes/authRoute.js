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
router.post('/register', [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').matches(/^(\+251|0)[0-9]{9}$/).withMessage('Please enter a valid Ethiopian phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['buyer', 'seller', 'landlord', 'agent']).withMessage('Invalid role')
], registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], loginUser);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getCurrentUser);

module.exports = router;