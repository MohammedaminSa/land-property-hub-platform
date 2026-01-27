# Ethiopian Real Estate - API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Endpoints

### 1.1 Register User
**POST** `/auth/register`

**Description:** Register a new user account

**Access:** Public

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+251911234567",
  "password": "password123",
  "role": "buyer" // buyer, seller,
 landlord, agent
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+251911234567",
    "role": "buyer",
    "isVerified": false,
    "isApproved": true
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists",
  "errors": []
}
```

---

### 1.2 Login User
**POST** `/auth/login`

**Description:** Login with email and password

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "buyer",
    "isApproved": true
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 1.3 Get Current User
**GET** `/auth/me`

**Description:** Get logged-in user details

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+251911234567",
    "role": "buyer",
    "isVerified": false,
    "isApproved": true,
    "profileImage": null,
    "address": {
      "city": "Addis Ababa",
      "subcity": "Bole"
    }
  }
}
```

---

## 2. Property Endpoints

### 2.1 Get All Properties
**GET** `/properties`

**Description:** Get list of properties with filters and pagination

**Access:** Public

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 12)
- `search` (string) - Search in title and description
- `category` (string) - Filter by category (residential_land, apartment_sale, house_rent)
- `type` (string) - Filter by type (land, apartment, house, villa, condominium)
- `city` (string) - Filter by city
- `subcity` (string) - Filter by subcity
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `minArea` (number) - Minimum area size
- `maxArea` (number) - Maximum area size
- `bedrooms` (number) - Minimum bedrooms
- `bathrooms` (number) - Minimum bathrooms
- `parking` (boolean) - Has parking
- `furnished` (boolean) - Is furnished
- `garden` (boolean) - Has garden
- `security` (boolean) - Has security
- `sortBy` (string) - Sort option (createdAt, price_asc, price_desc, area_asc, area_desc, views)

**Example Request:**
```
GET /properties?city=Addis Ababa&minPrice=1000000&maxPrice=5000000&bedrooms=3&sortBy=price_asc&page=1&limit=12
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "pagination": {
    "page": 1,
    "limit": 12,
    "pages": 4,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Modern 3 Bedroom Apartment in Bole",
      "description": "Spacious apartment with modern amenities...",
      "category": "apartment_sale",
      "type": "apartment",
      "price": 3500000,
      "currency": "ETB",
      "area": {
        "size": 150,
        "unit": "sqm"
      },
      "location": {
        "city": "Addis Ababa",
        "subcity": "Bole",
        "woreda": "03",
        "kebele": "12"
      },
      "features": {
        "bedrooms": 3,
        "bathrooms": 2,
        "parking": true,
        "furnished": false,
        "garden": false,
        "security": true
      },
      "images": [
        {
          "filename": "property-123-1.jpg",
          "isPrimary": true
        }
      ],
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Jane",
        "lastName": "Smith",
        "phone": "+251911234568",
        "email": "jane@example.com"
      },
      "status": "approved",
      "isActive": true,
      "views": 45,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2.2 Get Single Property
**GET** `/properties/:id`

**Description:** Get detailed information about a specific property

**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Modern 3 Bedroom Apartment in Bole",
    "description": "Spacious apartment with modern amenities, located in the heart of Bole...",
    "category": "apartment_sale",
    "type": "apartment",
    "price": 3500000,
    "currency": "ETB",
    "area": {
      "size": 150,
      "unit": "sqm"
    },
    "location": {
      "city": "Addis Ababa",
      "subcity": "Bole",
      "woreda": "03",
      "kebele": "12",
      "coordinates": {
        "latitude": 9.0192,
        "longitude": 38.7525
      }
    },
    "features": {
      "bedrooms": 3,
      "bathrooms": 2,
      "parking": true,
      "furnished": false,
      "garden": false,
      "security": true
    },
    "images": [
      {
        "filename": "property-123-1.jpg",
        "caption": "Living room",
        "isPrimary": true
      },
      {
        "filename": "property-123-2.jpg",
        "caption": "Master bedroom",
        "isPrimary": false
      }
    ],
    "documents": [
      {
        "type": "title_deed",
        "filename": "title-deed-123.pdf",
        "uploadDate": "2024-01-15T10:30:00.000Z"
      }
    ],
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Jane",
      "lastName": "Smith",
      "phone": "+251911234568",
      "email": "jane@example.com",
      "profileImage": "profile-jane.jpg"
    },
    "status": "approved",
    "isActive": true,
    "views": 46,
    "approvedBy": "507f1f77bcf86cd799439013",
    "approvedAt": "2024-01-15T11:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Property not found"
}
```

---

### 2.3 Create Property
**POST** `/properties`

**Description:** Create a new property listing

**Access:** Private (Seller, Landlord, Agent only - must be approved)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Modern 3 Bedroom Apartment in Bole",
  "description": "Spacious apartment with modern amenities...",
  "category": "apartment_sale",
  "type": "apartment",
  "price": 3500000,
  "currency": "ETB",
  "area": {
    "size": 150,
    "unit": "sqm"
  },
  "location": {
    "city": "Addis Ababa",
    "subcity": "Bole",
    "woreda": "03",
    "kebele": "12"
  },
  "features": {
    "bedrooms": 3,
    "bathrooms": 2,
    "parking": true,
    "furnished": false,
    "garden": false,
    "security": true
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Property created successfully and pending approval",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Modern 3 Bedroom Apartment in Bole",
    "status": "pending",
    "owner": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2.4 Upload Property Images
**POST** `/properties/:id/images`

**Description:** Upload images for a property

**Access:** Private (Property owner only)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `images` (files) - Multiple image files (max 10)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "images": [
      {
        "filename": "property-123-1.jpg",
        "isPrimary": true
      },
      {
        "filename": "property-123-2.jpg",
        "isPrimary": false
      }
    ]
  }
}
```

---

### 2.5 Update Property
**PUT** `/properties/:id`

**Description:** Update property details

**Access:** Private (Property owner only)

**Request Body:** (Same as Create Property - all fields optional)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Property updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

---

### 2.6 Delete Property
**DELETE** `/properties/:id`

**Description:** Delete a property listing

**Access:** Private (Property owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### 2.7 Get My Properties
**GET** `/properties/my/listings`

**Description:** Get all properties owned by current user

**Access:** Private

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Modern 3 Bedroom Apartment",
      "status": "approved",
      "price": 3500000,
      "views": 45,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 3. Inquiry Endpoints

### 3.1 Send Inquiry
**POST** `/inquiries`

**Description:** Send an inquiry about a property

**Access:** Private

**Request Body:**
```json
{
  "property": "507f1f77bcf86cd799439011",
  "subject": "Interested in viewing the property",
  "message": "I would like to schedule a viewing. When is a good time?"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Inquiry sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "property": "507f1f77bcf86cd799439011",
    "sender": "507f1f77bcf86cd799439015",
    "subject": "Interested in viewing the property",
    "message": "I would like to schedule a viewing...",
    "status": "pending",
    "createdAt": "2024-01-15T14:00:00.000Z"
  }
}
```

---

### 3.2 Get My Inquiries
**GET** `/inquiries`

**Description:** Get all inquiries (sent or received)

**Access:** Private

**Query Parameters:**
- `type` (string) - "sent" or "received" (default: both)
- `status` (string) - Filter by status (pending, responded, closed)

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "property": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Modern 3 Bedroom Apartment",
        "price": 3500000
      },
      "sender": {
        "_id": "507f1f77bcf86cd799439015",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "subject": "Interested in viewing",
      "message": "I would like to schedule a viewing...",
      "status": "pending",
      "createdAt": "2024-01-15T14:00:00.000Z"
    }
  ]
}
```

---

## 4. Admin Endpoints

### 4.1 Get Admin Dashboard
**GET** `/admin/dashboard`

**Description:** Get admin dashboard statistics

**Access:** Private (Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "statistics": {
      "totalUsers": 150,
      "totalProperties": 89,
      "pendingProperties": 12,
      "approvedProperties": 75,
      "totalInquiries": 234,
      "pendingInquiries": 45
    },
    "recentUsers": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "role": "seller",
        "isApproved": false,
        "createdAt": "2024-01-15T10:00:00.000Z"
      }
    ],
    "pendingProperties": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Modern Apartment",
        "price": 3500000,
        "owner": {
          "firstName": "Jane",
          "lastName": "Smith",
          "email": "jane@example.com"
        },
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

### 4.2 Get All Users
**GET** `/admin/users`

**Description:** Get list of all users

**Access:** Private (Admin only)

**Query Parameters:**
- `page` (number) - Page number
- `limit` (number) - Items per page
- `role` (string) - Filter by role
- `isApproved` (boolean) - Filter by approval status

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 150,
  "pagination": {
    "page": 1,
    "pages": 15
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+251911234567",
      "role": "seller",
      "isApproved": false,
      "isVerified": false,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### 4.3 Approve User
**PUT** `/admin/users/:id/approve`

**Description:** Approve a user account

**Access:** Private (Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "User approved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "firstName": "John",
    "lastName": "Doe",
    "isApproved": true
  }
}
```

---

### 4.4 Approve Property
**PUT** `/admin/properties/:id/approve`

**Description:** Approve a property listing

**Access:** Private (Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Property approved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Modern Apartment",
    "status": "approved",
    "approvedBy": "507f1f77bcf86cd799439013",
    "approvedAt": "2024-01-15T15:00:00.000Z"
  }
}
```

---

### 4.5 Reject Property
**PUT** `/admin/properties/:id/reject`

**Description:** Reject a property listing

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "reason": "Property does not meet our quality standards"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Property rejected",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "rejected",
    "rejectionReason": "Property does not meet our quality standards"
  }
}
```

---

## 5. User Profile Endpoints

### 5.1 Update Profile
**PUT** `/users/profile`

**Description:** Update user profile information

**Access:** Private

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+251911234567",
  "address": {
    "city": "Addis Ababa",
    "subcity": "Bole",
    "woreda": "03",
    "kebele": "12"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+251911234567",
    "address": {
      "city": "Addis Ababa",
      "subcity": "Bole"
    }
  }
}
```

---

### 5.2 Change Password
**PUT** `/users/change-password`

**Description:** Change user password

**Access:** Private

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 5.3 Upload Profile Image
**POST** `/users/profile-image`

**Description:** Upload profile picture

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `image` (file) - Profile image file

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "profileImage": "profile-john-123.jpg"
  }
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Response when exceeded:**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## File Upload Specifications

### Images
- **Max size:** 5MB per image
- **Formats:** JPG, JPEG, PNG, WebP
- **Max images per property:** 10
- **Storage:** Local uploads folder or Cloudinary

### Documents
- **Max size:** 10MB per document
- **Formats:** PDF
- **Types:** title_deed, lease_agreement, building_permit

---

## Testing with Postman

1. Import the Postman collection (if provided)
2. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (will be set after login)
3. Test authentication first
4. Use the token for protected routes

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response includes:**
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 5,
    "total": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Search and Filters

### Text Search
Use `search` parameter to search in title and description:
```
GET /properties?search=modern apartment
```

### Multiple Filters
Combine multiple filters:
```
GET /properties?city=Addis Ababa&minPrice=1000000&bedrooms=3&parking=true
```

### Sorting
Use `sortBy` parameter:
- `createdAt` - Newest first (default)
- `price_asc` - Price low to high
- `price_desc` - Price high to low
- `area_asc` - Area small to large
- `area_desc` - Area large to small
- `views` - Most viewed

---

## Security Best Practices

1. **Always use HTTPS in production**
2. **Store JWT token securely** (httpOnly cookies recommended)
3. **Never expose sensitive data** in responses
4. **Validate all inputs** on both client and server
5. **Use strong passwords** (min 6 characters, mix of letters/numbers)
6. **Implement rate limiting** to prevent abuse
7. **Keep dependencies updated** for security patches

---

## Support

For API issues or questions:
- Email: support@ethiopianrealestate.com
- Documentation: https://docs.ethiopianrealestate.com
- GitHub: https://github.com/your-repo

---

**API Version:** 1.0.0  
**Last Updated:** January 2026
