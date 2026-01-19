# Backend Structure

## Project Organization

```
backend/
├── controllers/          # Business logic
│   ├── authController.js
│   ├── propertyController.js
│   ├── inquiryController.js
│   ├── userController.js
│   └── adminController.js
├── models/              # Database schemas
│   ├── userModel.js
│   ├── propertyModel.js
│   └── inquiryModel.js
├── routes/              # API endpoints (clean & organized)
│   ├── authRoute.js
│   ├── propertyRoute.js
│   ├── inquiryRoute.js
│   ├── userRoute.js
│   └── adminRoute.js
├── validators/          # Validation rules
│   ├── authValidator.js
│   ├── propertyValidator.js
│   └── inquiryValidator.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   └── errorHandler.js
├── utils/              # Utility functions
│   ├── asyncHandler.js
│   ├── errorResponse.js
│   └── errorMessages.js
├── server.js           # Application entry point
├── package.json        # Dependencies
└── .env               # Environment variables
```

## Architecture Pattern: MVC with Validators

### Models
- Define database schemas using Mongoose
- Handle data validation and relationships
- Include custom methods (e.g., password hashing, comparison)

### Controllers
- Contain business logic
- Process requests and responses
- Interact with models
- Handle errors using asyncHandler

### Routes (Clean & Organized)
- Import middleware, validators, and controllers at the top
- Define API endpoints
- Group related routes together
- Use router.use() for common middleware
- Keep routes minimal and readable

### Validators
- Separate validation rules from routes
- Reusable validation logic
- Clear and maintainable
- Easy to test

### Middleware
- Authentication (JWT verification)
- Authorization (role-based access)
- Error handling (centralized)

### Utils
- asyncHandler: Wraps async functions to catch errors
- ErrorResponse: Custom error class
- errorMessages: Centralized error messages

## Route Organization Pattern

Each route file follows this structure:

```javascript
const express = require('express');
const router = express.Router();

// 1. Import Middleware
const { protect, authorize } = require('../middleware/auth');

// 2. Import Validators
const { validation1, validation2 } = require('../validators/someValidator');

// 3. Import Controllers
const { controller1, controller2 } = require('../controllers/someController');

// 4. Define Routes (grouped by access level)
// Public routes
router.get('/public', validation1, controller1);

// Protected routes
router.use(protect);
router.get('/protected', validation2, controller2);

module.exports = router;
```

## Benefits of This Structure

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Maintainability**: Easy to locate and update code
3. **Testability**: Controllers and validators can be tested independently
4. **Scalability**: Easy to add new features
5. **Readability**: Clean, organized, self-documenting code
6. **Reusability**: Validators can be reused across routes
7. **Consistency**: All routes follow the same pattern

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)

### Properties (`/api/properties`)
- `GET /` - Get all properties (public)
- `GET /:id` - Get single property (public)
- `POST /` - Create property (protected, seller/landlord/agent)
- `GET /my/listings` - Get user's properties (protected)

### Inquiries (`/api/inquiries`)
- `POST /` - Create inquiry (protected)
- `GET /received` - Get received inquiries (protected)
- `GET /sent` - Get sent inquiries (protected)
- `PUT /:id/respond` - Respond to inquiry (protected)

### Users (`/api/users`)
- `GET /profile` - Get user profile (protected)

### Admin (`/api/admin`)
- `GET /dashboard` - Get dashboard data (protected, admin only)

## Next Steps

1. Test all endpoints
2. Implement file upload for images
3. Add admin approval endpoints
4. Implement email notifications
5. Add more user profile features