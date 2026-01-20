const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'images') {
      cb(null, 'uploads/properties');
    } else if (file.fieldname === 'documents') {
      cb(null, 'uploads/documents');
    } else if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profiles');
    } else {
      cb(null, 'uploads/temp');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed image types
  const imageTypes = /jpeg|jpg|png|gif|webp/;
  // Allowed document types
  const documentTypes = /pdf|doc|docx/;
  
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (file.fieldname === 'images' || file.fieldname === 'profileImage') {
    // Check if image
    if (imageTypes.test(extname) && mimetype.startsWith('image/')) {
      return cb(null, true);
    } else {
      cb(new ErrorResponse('Only image files are allowed (jpeg, jpg, png, gif, webp)', 400));
    }
  } else if (file.fieldname === 'documents') {
    // Check if document
    if (documentTypes.test(extname.slice(1))) {
      return cb(null, true);
    } else {
      cb(new ErrorResponse('Only document files are allowed (pdf, doc, docx)', 400));
    }
  } else {
    cb(null, true);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Upload configurations for different scenarios
exports.uploadPropertyImages = upload.array('images', 10); // Max 10 images
exports.uploadPropertyDocuments = upload.array('documents', 5); // Max 5 documents
exports.uploadProfileImage = upload.single('profileImage');
exports.uploadVerificationDocuments = upload.array('verificationDocuments', 3); // Max 3 docs

// Upload multiple types at once
exports.uploadPropertyFiles = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'documents', maxCount: 5 }
]);