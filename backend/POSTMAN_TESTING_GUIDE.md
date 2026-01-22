# Postman Testing Guide - Ethiopian Real Estate API

## Setup Instructions

### 1. Import the Collection
1. Open Postman
2. Click **Import** button
3. Select `Ethiopian_Real_Estate_API.postman_collection.json`
4. The collection will be imported with all routes organized by category

### 2. Environment Variables
The collection uses these variables (automatically managed):
- `baseUrl`: http://localhost:5000/api
- `token`: JWT token (auto-set after login)
- `userId`: Current user ID (auto-set after registration/login)
- `propertyId`: Property ID for testing (auto-set after creating property)

### 3. Start the Backend Server
```bash
cd backend
npm install
npm start
```
Server should run on `htt