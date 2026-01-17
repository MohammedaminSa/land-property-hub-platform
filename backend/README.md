# Real Estate Backend API

Backend API for the Ethiopian Real Estate Platform built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Registration, login, profile management with verification
- **Property Management**: CRUD operations for properties with approval workflow
- **Inquiry System**: Messaging between buyers and sellers
- **Admin Panel**: User and property approval system
- **Security**: Rate limiting, input validation, password hashing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer (for images and documents)

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   - MongoDB connection string
   - JWT secret key
   - Email configuration
   - File upload settings

4. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Properties
- `GET /api/properties` - Get all approved properties (with filtering)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (authenticated)
- `GET /api/properties/my/listings` - Get user's properties

### Inquiries
- `POST /api/inquiries` - Send inquiry about property
- `GET /api/inquiries/received` - Get received inquiries
- `GET /api/inquiries/sent` - Get sent inquiries
- `PUT /api/inquiries/:id/respond` - Respond to inquiry

### Admin (Coming Soon)
- User approval endpoints
- Property approval endpoints
- Dashboard analytics

## User Roles

- **Buyer**: Browse properties, send inquiries
- **Seller**: List properties for sale
- **Landlord**: List properties for rent
- **Agent**: List properties on behalf of others
- **Admin**: Approve users and properties

## Database Models

### User
- Personal information and contact details
- Role-based permissions
- Verification status and documents
- Ethiopian address structure

### Property
- Property details and features
- Location with Ethiopian administrative divisions
- Images and legal documents
- Approval workflow status

### Inquiry
- Communication between users
- Property-specific messaging
- Response tracking

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers

## Ethiopian Localization

- Phone number validation for Ethiopian format (+251 or 0)
- Address structure (City, Subcity, Woreda, Kebele)
- Currency support (ETB, USD)
- Ethiopian administrative divisions

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Run tests (when implemented)
npm test
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/real-estate-ethiopia
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
MAX_FILE_SIZE=5000000
FILE_UPLOAD_PATH=./uploads
```

## API Response Format

All API responses follow this structure:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Response data (if applicable)
  "errors": [] // Validation errors (if applicable)
}
```

## Next Steps

1. Implement file upload for property images and documents
2. Add email notifications for inquiries and approvals
3. Implement admin dashboard endpoints
4. Add property search with geolocation
5. Implement user profile management
6. Add property favorites/wishlist functionality