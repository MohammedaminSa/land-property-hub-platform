# PropertyHub Setup Guide

## Quick Start

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory with:
```env
MONGODB_URI=mongodb://localhost:27017/property-platform
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
PORT=5000
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **Mac**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### 5. Run the Application

#### Option A: Run Both Frontend and Backend Together
```bash
npm run dev
```

#### Option B: Run Separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Features Overview

### 🏡 For Property Owners (Sellers/Landlords/Agents)
1. **Register** with your role (seller, landlord, agent)
2. **Login** to your account
3. **Add Property** - Click "List Property" in the navbar
4. **Manage Properties** - View, edit, delete from your dashboard
5. **Handle Inquiries** - Respond to buyer/tenant inquiries

### 🔍 For Property Seekers (Buyers/Tenants)
1. **Browse Properties** - Visit homepage or properties page
2. **Search & Filter** - Use filters to find specific properties
3. **View Details** - Click on any property for full details
4. **Send Inquiries** - Contact property owners directly
5. **Track Inquiries** - View your sent inquiries in dashboard

## Default Test Data

After starting the application, you can:

1. **Register** different types of users:
   - Seller/Agent: Can list properties for sale
   - Landlord: Can list properties for rent
   - Buyer/Tenant: Can search and inquire about properties

2. **Create Sample Properties**:
   - Add apartments, houses, land, or commercial properties
   - Upload multiple images
   - Set detailed features and amenities

3. **Test the Inquiry System**:
   - Send inquiries as a buyer/tenant
   - Respond to inquiries as a property owner

## API Testing

You can test the API endpoints using tools like Postman:

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Property Endpoints
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (requires auth)
- `PUT /api/properties/:id` - Update property (requires auth)
- `DELETE /api/properties/:id` - Delete property (requires auth)

### Inquiry Endpoints
- `POST /api/inquiries` - Send inquiry (requires auth)
- `GET /api/inquiries/received` - Get received inquiries (requires auth)
- `GET /api/inquiries/sent` - Get sent inquiries (requires auth)
- `PUT /api/inquiries/:id/respond` - Respond to inquiry (requires auth)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **Port Already in Use**
   - Change the PORT in .env file
   - Kill existing processes: `npx kill-port 5000`

3. **Frontend Not Loading**
   - Make sure you're in the client directory when running `npm start`
   - Check if all dependencies are installed

4. **Image Upload Issues**
   - Ensure the `uploads` directory exists
   - Check file permissions

5. **CORS Issues**
   - The backend includes CORS middleware
   - Frontend proxy is configured in client/package.json

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **Database**: Use MongoDB Compass to view your data
3. **Debugging**: Check browser console and terminal for errors
4. **File Structure**: Keep components organized in their respective folders

## Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
```

### Build for Production
```bash
npm run build
npm start
```

## Next Steps

1. **Customize Styling**: Modify the Material-UI theme in App.js
2. **Add More Features**: 
   - Property favorites
   - Advanced search with maps
   - Payment integration
   - Email notifications
3. **Enhance Security**: 
   - Rate limiting
   - Input validation
   - File upload restrictions
4. **Performance**: 
   - Image optimization
   - Caching
   - Database indexing

## Support

If you encounter any issues:
1. Check this setup guide
2. Review the main README.md
3. Check the console for error messages
4. Ensure all dependencies are properly installed