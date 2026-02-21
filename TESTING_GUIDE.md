# Testing Guide - Properties List Page

## What We Just Completed

We've connected the home page to the properties list page. Now you can navigate from the home page to the properties list in multiple ways:

### Navigation Options Added:

1. **Navbar** - Click "Properties" in the navigation bar
2. **Hero Section** - Click the "Search" button in the hero search bar
3. **Featured Properties** - Click on any property card to view details (will show property ID in URL)
4. **Featured Properties** - Click "View All Properties" button at the bottom
5. **CTA Section** - Click "Browse Properties" button

## How to Test

### Step 1: Start the Backend Server
```bash
cd backend
npm start
```
The backend should start on `http://localhost:5000`

### Step 2: Start the Frontend Server
```bash
cd frontend
npm start
```
The frontend should start on `http://localhost:3000`

### Step 3: Test Navigation

1. **Open your browser** and go to `http://localhost:3000`

2. **Test Home Page Links:**
   - Click the "Search" button in the hero section → Should navigate to `/properties`
   - Scroll down to "Featured Properties" section
   - Click on any property card → Should navigate to `/properties/featured-X` (where X is 1-6)
   - Click "View All Properties" button → Should navigate to `/properties`
   - Scroll to CTA section and click "Browse Properties" → Should navigate to `/properties`

3. **Test Properties List Page:**
   - You should see the properties list page with:
     - Search bar at the top
     - Filter sidebar on the left (Category, Type, City, Price Range, etc.)
     - Sort dropdown (Latest, Price: Low to High, etc.)
     - Grid/List view toggle buttons
     - Property cards in a grid layout
     - Pagination at the bottom

4. **Test Filters:**
   - Try selecting different categories (Apartment, House, Villa, etc.)
   - Try selecting different types (Sale, Rent)
   - Try selecting different cities
   - Try adjusting price and area ranges
   - Try selecting bedrooms and bathrooms
   - Try checking feature checkboxes (Parking, Garden, etc.)
   - Click "Apply Filters" button

5. **Test Search:**
   - Type something in the search bar
   - Press Enter or click the search icon

6. **Test Sort:**
   - Try different sort options from the dropdown

7. **Test View Toggle:**
   - Click the grid icon (should show grid view)
   - Click the list icon (should show list view)

8. **Test Pagination:**
   - Click "Next" button
   - Click "Previous" button
   - Click on page numbers

## Expected Behavior

### Current State (Mock Data):
- The properties list page is currently showing mock/static data
- Filters, search, and sort are set up but not yet connected to the backend API
- Clicking on property cards will navigate to `/properties/:id` (property details page not built yet)

### What Works:
✅ Navigation from home page to properties list page
✅ UI components render correctly
✅ Filters UI is functional
✅ Search bar is present
✅ Sort dropdown works
✅ View toggle works
✅ Pagination UI works
✅ Property cards are clickable

### What Needs Backend Integration (Next Steps):
❌ Fetch real properties from backend API
❌ Apply filters to backend query
❌ Search functionality with backend
❌ Sort functionality with backend
❌ Pagination with backend data
❌ Property details page (not built yet)

## Next Steps After Testing

Once you've tested the navigation and UI:

1. **Report any issues** you find with the UI or navigation
2. **We'll integrate the backend API** to fetch real properties
3. **We'll connect filters, search, and sort** to the backend
4. **We'll build the Property Details page** (`/properties/:id`)
5. **Continue with the roadmap** in `FRONTEND_DOCUMENTATION.md`

## Common Issues and Solutions

### Issue: "Cannot GET /properties"
**Solution:** Make sure you're running the React development server (`npm start` in frontend folder)

### Issue: Property cards not clickable
**Solution:** We just added IDs to the featured properties, so they should now be clickable

### Issue: Clicking property card shows blank page
**Solution:** The property details page hasn't been built yet, so you'll see a blank page. This is expected.

### Issue: Backend not responding
**Solution:** Make sure MongoDB is running and the backend server is started

## Testing Checklist

- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3000
- [ ] Home page loads correctly
- [ ] Can navigate to properties page from hero search button
- [ ] Can click on featured property cards
- [ ] "View All Properties" button works
- [ ] "Browse Properties" button in CTA works
- [ ] Navbar "Properties" link works
- [ ] Properties list page loads
- [ ] Filter sidebar is visible
- [ ] Search bar is visible
- [ ] Sort dropdown is visible
- [ ] View toggle buttons are visible
- [ ] Property cards are displayed
- [ ] Pagination is visible
- [ ] No console errors

---

**Ready to test!** Start both servers and try navigating through the application. Let me know what you find!
