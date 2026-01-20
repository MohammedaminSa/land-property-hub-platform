# API Testing Guide

Complete guide for testing all backend endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 1. Authentication Routes

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+251912345678",
  "password": "password123",
  "role": "buyer"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer TOKEN
```

---

## 2. Property Routes

### Get All Properties (Public)
```http
GET /properties?page=1&limit=10&minPrice=1000&maxPrice=50000&city=Addis Ababa
```

### Get Single Property
```http
GET /properties/:id
```

### Create Property (Protected - Seller/Landlord/Agent)
```http
POST /properties
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Beautiful Villa in Bole",
  "description": "Spacious 3-bedroom villa with modern amenities",
  "category": "house_rent",
  "type": "villa",
  "price": 50000,
  "currency": "ETB",
  "area": {
    "size": 250,
    "unit": "sqm"
  },
  "location": {
    "city": "Addis Ababa",
    "subcity": "Bole",
    "woreda": "10",
    "kebele": "05"
  },
  "features": {
    "bedrooms": 3,
    "bathrooms": 2,
    "parking": true,
    "furnished": true,
    "garden": true,
    "security": true
  }
}
```

### Get My Properties
```http
GET /properties/my/listings
Authorization: Bearer TOKEN
```

### Update Property
```http
PUT /properties/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 55000
}
```

### Delete Property
```http
DELETE /properties/:id
Authorization: Bearer TOKEN
```

### Upload Property Images
```http
POST /properties/:id/images
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

images: [file1.jpg, file2.jpg, file3.jpg]
```

---

## 3. Inquiry Routes

### Create Inquiry
```http
POST /inquiries
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "property": "PROPERTY_ID",
  "subject": "Interested in this property",
  "message": "I would like to schedule a viewing"
}
```

### Get Received Inquiries
```http
GET /inquiries/received?page=1&limit=10&status=pending
Authorization: Bearer TOKEN
```

### Get Sent Inquiries
```http
GET /inquiries/sent?page=1&limit=10
Authorization: Bearer TOKEN
```

### Respond to Inquiry
```http
PUT /inquiries/:id/respond
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "message": "Thank you for your interest. I'm available for viewing tomorrow."
}
```

---

## 4. User Profile Routes

### Get Profile
```http
GET /users/profile
Authorization: Bearer TOKEN
```

### Update Profile
```http
PUT /users/profile
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+251911223344",
  "address": {
    "city": "Addis Ababa",
    "subcity": "Bole",
    "woreda": "10",
    "kebele": "05"
  }
}
```

### Upload Profile Image
```http
POST /users/profile/image
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

profileImage: file.jpg
```

### Upload Verification Documents
```http
POST /users/verification/documents
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

verificationDocuments: [id_card.pdf, license.pdf]
type: id_card
```

---

## 5. Admin Routes (Admin Only)

### Get Dashboard
```http
GET /admin/dashboard
Authorization: Bearer ADMIN_TOKEN
```

### Get All Users
```http
GET /admin/users?page=1&limit=10&role=seller&isApproved=false
Authorization: Bearer ADMIN_TOKEN
```

### Approve User
```http
PUT /admin/users/:id/approve
Authorization: Bearer ADMIN_TOKEN
```

### Reject User
```http
PUT /admin/users/:id/reject
Authorization: Bearer ADMIN_TOKEN
```

### Get All Properties (Admin View)
```http
GET /admin/properties?page=1&limit=10&status=pending
Authorization: Bearer ADMIN_TOKEN
```

### Approve Property
```http
PUT /admin/properties/:id/approve
Authorization: Bearer ADMIN_TOKEN
```

### Reject Property
```http
PUT /admin/properties/:id/reject
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "reason": "Incomplete information"
}
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

## Testing with Postman

1. **Create Environment Variables:**
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: (Set after login)
   - `adminToken`: (Set after admin login)

2. **Set Token Automatically:**
   In login request, add to Tests tab:
   ```javascript
   pm.environment.set("token", pm.response.json().token);
   ```

3. **Use Token in Requests:**
   Authorization tab → Type: Bearer Token → Token: `{{token}}`

---

## File Upload Testing

### Using Postman:
1. Select POST method
2. Go to Body tab
3. Select "form-data"
4. For file fields, change type from "Text" to "File"
5. Click "Select Files" and choose your files

### Using cURL:
```bash
curl -X POST http://localhost:5000/api/properties/PROPERTY_ID/images \
  -H "Authorization: Bearer TOKEN" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```