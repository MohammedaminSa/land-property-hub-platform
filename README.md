# 🏡 PropertyHub - Modern Property Listing Platform

[![License: MIT](https://img.shields.io/badge/Licenand inquiries where sellers, agents, landlords can list properties and buyers, tenants can search and contact them.

## Features

### 🏡 Property Management
- **Sellers/Agents** can list apartments, houses, land, and commercial properties for sale
- **Landlords** can list properties for rent
- Upload multiple property images
- Detailed property information (bedrooms, bathrooms, area, amenities)
- Location-based listings

### 🔍 Search & Discovery
- **Buyers/Tenants** can search and filter properties
- Filter by property type, listing type, location, price range, bedrooms, bathrooms
- Featured properties on homepage
- Detailed property view with image gallery

### 💬 Inquiry System
- Direct contact between buyers/tenants and property owners
- Inquiry management dashboard
- Response tracking system
- Email and phone contact preferences

### 👤 User Management
- User registration and authentication
- Role-based access (buyer, seller, agent, landlord, tenant)
- Personal dashboard for managing properties and inquiries

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React** with React Router
- **Material-UI (MUI)** for components
- **Axios** for API calls
- **Context API** for state management

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a \`.env\` file in the root directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/property-platform
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
\`\`\`

3. Start the backend server:
\`\`\`bash
npm run server
\`\`\`

### Frontend Setup

1. Navigate to the client directory:
\`\`\`bash
cd client
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the React development server:
\`\`\`bash
npm start
\`\`\`

### Full Development Setup

Run both backend and frontend concurrently:
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`GET /api/auth/me\` - Get current user

### Properties
- \`GET /api/properties\` - Get all properties (with filters)
- \`GET /api/properties/:id\` - Get single property
- \`POST /api/properties\` - Create new property (authenticated)
- \`PUT /api/properties/:id\` - Update property (authenticated)
- \`DELETE /api/properties/:id\` - Delete property (authenticated)
- \`GET /api/properties/user/my-properties\` - Get user's properties

### Inquiries
- \`POST /api/inquiries\` - Create inquiry (authenticated)
- \`GET /api/inquiries/received\` - Get received inquiries (authenticated)
- \`GET /api/inquiries/sent\` - Get sent inquiries (authenticated)
- \`PUT /api/inquiries/:id/respond\` - Respond to inquiry (authenticated)

## Project Structure

\`\`\`
property-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   ├── Property.js
│   └── Inquiry.js
├── routes/                 # Express routes
│   ├── auth.js
│   ├── properties.js
│   └── inquiries.js
├── middleware/             # Custom middleware
│   └── auth.js
├── uploads/                # File uploads directory
├── server.js               # Express server
├── package.json
└── README.md
\`\`\`

## Usage

1. **Register** as a buyer, seller, agent, landlord, or tenant
2. **Browse properties** on the homepage or properties page
3. **Search and filter** properties based on your preferences
4. **View property details** including images, features, and owner contact
5. **Send inquiries** to property owners (requires login)
6. **Manage your properties** and inquiries through the dashboard
7. **List new properties** using the "Add Property" form

## Features in Detail

### Property Types
- **Apartment**: Multi-unit residential buildings
- **House**: Single-family homes
- **Land**: Vacant lots and land parcels
- **Commercial**: Office spaces, retail, warehouses

### User Roles
- **Buyer**: Looking to purchase properties
- **Seller**: Listing properties for sale
- **Agent**: Real estate professionals managing multiple listings
- **Landlord**: Property owners listing rentals
- **Tenant**: Looking for rental properties

### Search Filters
- Property type (apartment, house, land, commercial)
- Listing type (sale or rent)
- Location (city-based search)
- Price range (minimum and maximum)
- Number of bedrooms and bathrooms
- Property features and amenities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.