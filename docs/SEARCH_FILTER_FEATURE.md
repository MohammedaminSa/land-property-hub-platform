# Search & Filter Feature Documentation

## Overview
Comprehensive search and filter functionality has been added to the Ethiopian Real Estate platform, allowing users to find properties based on multiple criteria.

## Backend Enhancements

### Property Controller (`backend/controllers/propertyController.js`)
Enhanced the `getProperties` endpoint with the following filters:

#### Basic Filters
- **Category**: Filter by property category (residential_land, apartment_sale, house_rent)
- **Type**: Filter by property type (land, apartment, house, villa, condominium)
- **Location**: Search by city and subcity (case-insensitive)
- **Price Range**: Filter by minimum and maximum price
- **Area Range**: Filter by minimum and maximum area size

#### Advanced Filters
- **Bedrooms**: Filter by minimum number of bedrooms
- **Bathrooms**: Filter by minimum number of bathrooms
- **Features**: Filter by parking, furnished, garden, security

#### Search & Sort
- **Text Search**: Full-text search across title and description
- **Sort Options**:
  - Newest first (default)
  - Price: Low to High
  - Price: High to Low
  - Area: Small to Large
  - Area: Large to Small
  - Most Viewed

#### Pagination
- Configurable page size (default: 12 items per page)
- Returns pagination metadata (current page, total pages, hasNext, hasPrev)

## Frontend Components

### 1. SearchFilter Component (`frontend/src/components/SearchFilter.jsx`)
Reusable filter component with:
- Search bar for text queries
- Basic filters (category, type, city, sort)
- Advanced filters toggle
- Advanced filters (subcity, price range, area range, bedrooms, bathrooms, features)
- Reset button

### 2. PropertyCard Component (`frontend/src/components/PropertyCard.jsx`)
Reusable property card displaying:
- Property image
- Category badge
- Title
- Price
- Location
- Area size
- Bedrooms/bathrooms (if applicable)
- View count

### 3. Pagination Component (`frontend/src/components/Pagination.jsx`)
Smart pagination with:
- Previous/Next buttons
- Page number buttons
- Ellipsis for large page counts
- Disabled state handling
- Smooth scroll to top on page change

### 4. Enhanced Properties Page (`frontend/src/pages/Properties.jsx`)
- Integrated all filter components
- URL parameter synchronization
- Loading states
- Empty state handling
- Results count display

### 5. Enhanced Home Page (`frontend/src/pages/Home.jsx`)
- Quick search form in hero section
- Pre-filled category links
- Direct navigation to filtered results

## API Query Parameters

### Available Query Parameters
```
GET /api/properties?param=value

Parameters:
- search: Text search (string)
- category: Property category (enum)
- type: Property type (enum)
- city: City name (string)
- subcity: Subcity name (string)
- minPrice: Minimum price (number)
- maxPrice: Maximum price (number)
- minArea: Minimum area (number)
- maxArea: Maximum area (number)
- bedrooms: Minimum bedrooms (number)
- bathrooms: Minimum bathrooms (number)
- parking: Has parking (boolean)
- furnished: Is furnished (boolean)
- garden: Has garden (boolean)
- security: Has security (boolean)
- sortBy: Sort option (enum)
- page: Page number (number)
- limit: Items per page (number)
```

### Example Queries
```
# Search for apartments in Addis Ababa
/api/properties?category=apartment_sale&city=Addis%20Ababa

# Filter by price range
/api/properties?minPrice=1000000&maxPrice=5000000

# Search with multiple filters
/api/properties?city=Addis%20Ababa&bedrooms=3&parking=true&sortBy=price_asc

# Text search
/api/properties?search=modern+apartment+bole
```

## Features

### URL State Management
- All filters are synced with URL parameters
- Shareable URLs with filter state
- Browser back/forward navigation support

### User Experience
- Collapsible advanced filters
- Real-time filter updates
- Loading states
- Empty state messages
- Smooth pagination
- Results count display

### Performance
- Efficient MongoDB queries with indexes
- Pagination to limit data transfer
- Debounced search (can be added)

## Testing

### Manual Testing Steps
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to `/properties`
4. Test each filter individually
5. Test filter combinations
6. Test pagination
7. Test URL sharing
8. Test reset functionality

### Test Cases
- [ ] Search by text
- [ ] Filter by category
- [ ] Filter by location
- [ ] Filter by price range
- [ ] Filter by area range
- [ ] Filter by bedrooms/bathrooms
- [ ] Filter by features (checkboxes)
- [ ] Sort by different options
- [ ] Navigate through pages
- [ ] Reset all filters
- [ ] Share filtered URL
- [ ] Quick search from home page

## Future Enhancements
- Debounced search input
- Save search preferences
- Recent searches
- Popular searches
- Map view with location filter
- Distance-based search
- Favorite properties
- Email alerts for new matches
- Advanced search builder
- Export search results
