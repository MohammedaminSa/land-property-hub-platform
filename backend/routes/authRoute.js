const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/auth');

// Validators
const { registerValidation, loginValidation } = require('../validators/authValidator');

// Controllers
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;