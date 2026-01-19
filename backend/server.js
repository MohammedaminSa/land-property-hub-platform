const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
console.log('Loading routes...');
app.use('/api/auth', require('./routes/authRoute'));
console.log('Auth routes loaded');
app.use('/api/users', require('./routes/userRoute'));
console.log('Users routes loaded');
app.use('/api/properties', require('./routes/propertyRoute'));
console.log('Properties routes loaded');
app.use('/api/inquiries', require('./routes/inquiryRoute'));
console.log('Inquiries routes loaded');
app.use('/api/admin', require('./routes/adminRoute'));
console.log('Admin routes loaded');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Ethiopian Real Estate API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - must be before error handler
app.use('*', (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Error handling middleware - must be last
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});