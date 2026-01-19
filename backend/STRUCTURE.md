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
├── routes/              # API endpoints
│   ├── authRoute.js
│   ├── propertyRoute.js
│   ├── inquiryRoute.js
│   ├── userRoute.js
│   └── adminRoute.js
├── middleware/          # Custom middleware
│   └── auth.js
├── server.js           # Application entry point
├── package.json        # Dependencies
└── .env               # Environment variables
```

## Architecture Pattern: MVC (Model-View-Controller)

### Models
- Define database schemas using Mongoose
- Handle data validation and relationships
- Include custom methods (e.g., password hashing, comparison)

### Controllers
- Contain business logic
- Process requests and responses
- Interact with models
- Handle errors and validation

### Routes
- Define API endpoints
- Apply middleware (authentication, validation)
- Call controller functions
- Keep routes clean and readable

### Middleware
- Authentication (JWT verification)
- Authorization (role-based access)
- Validation (express-validator)
- Error handling

## Benefits of This Structure

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Maintainability**: Easy to locate and update code
3. **Testability**: Controllers can be tested independently
4. **Scalability**: Easy to add new features
5. **Readability**: Clean, organized code structure

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