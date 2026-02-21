# Ethiopian Real Estate - Frontend Documentation

## Project Overview
A modern, responsive real estate platform built with React, Tailwind CSS, and integrated with a Node.js/Express backend.

---

## Technology Stack
- **Framework**: React 19.2.4
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings) + Inter (body)

---

## Design System

### Colors
- **Primary**: Blue shades (#3b82f6 - #1e3a8a)
- **Secondary**: Orange (#d97706)
- **Backgrounds**: Gray shades
- **Text**: Gray-900 for headings, Gray-600 for body

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Shadows
- **Card**: `0 4px 24px -4px rgba(0, 0, 0, 0.08)`
- **Card Hover**: `0 12px 40px -8px rgba(0, 0, 0, 0.15)`
- **Elevated**: `0 20px 60px -12px rgba(0, 0, 0, 0.2)`

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/           # Images and static files
│   ├── components/       # Reusable components
│   ├── context/          # React Context (Auth)
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── package.json
└── tailwind.config.js
```

---

## Completed Features (1% Done)

### ✅ Pages
1. **Home Page** (`/`)
   - Hero section with search bar
   - Featured properties
   - How it works section
   - CTA section
   - Footer

2. **Login Page** (`/login`)
   - Email and password form
   - Error handling
   - Redirect based on role

3. **Register Page** (`/register`)
   - Full registration form
   - Role selection
   - Password validation

4. **Dashboard Page** (`/dashboard`)
   - Welcome message
   - Quick links based on role
   - Approval status display

### ✅ Components
- Navbar (with authentication)
- Hero
- PropertyCard
- FeaturedProperties
- HowItWorks
- CTASection
- Footer
- PrivateRoute

### ✅ Services
- API configuration (axios)
- Auth service
- Property service
- Inquiry service
- Admin service

### ✅ Context
- AuthContext (authentication state management)

---

## Remaining Features to Build (99%)

### 1. Properties Pages

#### 1.1 Properties List Page (`/properties`)
**Purpose**: Browse all approved properties with filters

**Features**:
- Grid/List view toggle
- Search bar (by title, location, description)
- Filters sidebar:
  - Category (residential_land, apartment_sale, house_rent, commercial)
  - Type (land, apartment, house, villa, condominium)
  - City dropdown
  - Subcity dropdown
  - Price range slider
  - Area size range
  - Bedrooms (1, 2, 3, 4, 5+)
  - Bathrooms (1, 2, 3, 4+)
  - Features checkboxes (parking, furnished, garden, security)
- Sort options:
  - Newest first
  - Price: Low to High
  - Price: High to Low
  - Area: Small to Large
  - Area: Large to Small
  - Most Viewed
- Pagination
- Property cards showing:
  - Primary image
  - Title
  - Location (city, subcity)
  - Price
  - Bedrooms, bathrooms, area
  - "For Sale" or "For Rent" badge
  - View count

**Components to Create**:
- `PropertiesList.js`
- `PropertyFilters.js`
- `PropertyGrid.js`
- `PropertyListItem.js`
- `SortDropdown.js`
- `Pagination.js`

---

#### 1.2 Property Details Page (`/properties/:id`)
**Purpose**: View detailed information about a single property

**Features**:
- Image gallery/carousel (with primary image)
- Property information:
  - Title
  - Description
  - Category and type badges
  - Price (with currency)
  - Location (city, subcity, woreda, kebele)
  - Area size and unit
  - Features (bedrooms, bathrooms, parking, etc.)
  - Status badge (approved)
  - View count
  - Posted date
- Owner information card:
  - Name
  - Phone number
  - Email
  - Profile image
- "Send Inquiry" button (opens inquiry form)
- Share buttons (social media)
- Similar properties section
- Breadcrumb navigation

**Components to Create**:
- `PropertyDetails.js`
- `ImageGallery.js`
- `PropertyInfo.js`
- `OwnerCard.js`
- `InquiryForm.js` (modal)
- `SimilarProperties.js`

---

#### 1.3 My Properties Page (`/my-properties`)
**Purpose**: Sellers/landlords/agents manage their listings

**Access**: Private (sellers, landlords, agents only)

**Features**:
- List of user's properties
- Status indicators (pending, approved, rejected)
- Quick actions:
  - Edit property
  - Delete property
  - Upload images
  - View inquiries
  - Toggle active/inactive
- Statistics:
  - Total properties
  - Approved properties
  - Pending approval
  - Total views
  - Total inquiries
- Filter by status
- Search own properties

**Components to Create**:
- `MyProperties.js`
- `MyPropertyCard.js`
- `PropertyStats.js`
- `PropertyActions.js`

---

#### 1.4 Add Property Page (`/add-property`)
**Purpose**: Create a new property listing

**Access**: Private (approved sellers, landlords, agents only)

**Features**:
- Multi-step form:
  
  **Step 1: Basic Information**
  - Title
  - Description (textarea)
  - Category (dropdown)
  - Type (dropdown)
  
  **Step 2: Pricing & Area**
  - Price
  - Currency (ETB/USD)
  - Area size
  - Area unit (sqm/hectare)
  
  **Step 3: Location**
  - City (dropdown)
  - Subcity (dropdown)
  - Woreda
  - Kebele
  - Coordinates (optional)
  
  **Step 4: Features**
  - Bedrooms (number)
  - Bathrooms (number)
  - Parking (checkbox)
  - Furnished (checkbox)
  - Garden (checkbox)
  - Security (checkbox)
  
  **Step 5: Images**
  - Upload multiple images (max 10)
  - Set primary image
  - Image preview
  - Drag and drop support

- Form validation
- Progress indicator
- Save as draft option
- Submit for approval

**Components to Create**:
- `AddProperty.js`
- `PropertyFormStep1.js`
- `PropertyFormStep2.js`
- `PropertyFormStep3.js`
- `PropertyFormStep4.js`
- `PropertyFormStep5.js`
- `ImageUploader.js`
- `FormProgress.js`

---

#### 1.5 Edit Property Page (`/properties/:id/edit`)
**Purpose**: Update existing property

**Access**: Private (property owner only)

**Features**:
- Same form as Add Property but pre-filled
- Can update all fields
- Can add/remove images
- Can change primary image
- Resubmit for approval if rejected

**Components to Create**:
- `EditProperty.js` (reuse Add Property components)

---

### 2. Inquiry Pages

#### 2.1 Inquiries Page (`/inquiries`)
**Purpose**: Manage sent and received inquiries

**Access**: Private (all authenticated users)

**Features**:
- Tabs:
  - **Sent Inquiries** (for buyers)
  - **Received Inquiries** (for sellers/landlords/agents)
- Inquiry list showing:
  - Property title and image
  - Subject
  - Message preview
  - Status (pending, responded, closed)
  - Date sent/received
  - Sender/receiver name
- Click to view full inquiry
- Filter by status
- Search inquiries
- Respond to inquiries (for property owners)
- Mark as closed

**Components to Create**:
- `Inquiries.js`
- `InquiryTabs.js`
- `InquiryList.js`
- `InquiryCard.js`
- `InquiryDetails.js` (modal)
- `InquiryResponse.js`

---

### 3. User Profile Pages

#### 3.1 Profile Page (`/profile`)
**Purpose**: View and edit user profile

**Access**: Private (all authenticated users)

**Features**:
- Profile information display:
  - Profile image
  - Name
  - Email
  - Phone
  - Role
  - Approval status
  - Member since date
- Edit profile form:
  - First name
  - Last name
  - Phone
  - Address (city, subcity, woreda, kebele)
  - Profile image upload
- Change password section:
  - Current password
  - New password
  - Confirm new password
- Account statistics (for sellers/landlords/agents):
  - Total properties listed
  - Total inquiries received
  - Profile views

**Components to Create**:
- `Profile.js`
- `ProfileInfo.js`
- `EditProfileForm.js`
- `ChangePasswordForm.js`
- `ProfileImageUpload.js`
- `AccountStats.js`

---

### 4. Admin Panel Pages

#### 4.1 Admin Dashboard (`/admin`)
**Purpose**: Overview of platform statistics

**Access**: Private (admin only)

**Features**:
- Statistics cards:
  - Total users
  - Total properties
  - Pending properties
  - Approved properties
  - Total inquiries
  - Pending inquiries
- Charts:
  - Properties by category (pie chart)
  - Properties by city (bar chart)
  - User registrations over time (line chart)
  - Inquiries over time (line chart)
- Recent activity:
  - Recent user registrations
  - Recent property submissions
  - Recent inquiries
- Quick actions:
  - Approve pending users
  - Approve pending properties
  - View all users
  - View all properties

**Components to Create**:
- `AdminDashboard.js`
- `StatCard.js`
- `PropertyCategoryChart.js`
- `PropertyCityChart.js`
- `UserRegistrationChart.js`
- `RecentActivity.js`
- `QuickActions.js`

---

#### 4.2 Admin Users Page (`/admin/users`)
**Purpose**: Manage all users

**Access**: Private (admin only)

**Features**:
- User list table:
  - Profile image
  - Name
  - Email
  - Phone
  - Role
  - Approval status
  - Verified status
  - Registration date
  - Actions (approve, delete)
- Filters:
  - Role (all, buyer, seller, landlord, agent)
  - Approval status (all, approved, pending)
  - Verified status
- Search by name or email
- Pagination
- Bulk actions:
  - Approve selected
  - Delete selected
- User details modal:
  - Full user information
  - Properties listed (for sellers/landlords/agents)
  - Inquiries sent/received
  - Activity log

**Components to Create**:
- `AdminUsers.js`
- `UserTable.js`
- `UserRow.js`
- `UserFilters.js`
- `UserDetailsModal.js`
- `BulkActions.js`

---

#### 4.3 Admin Properties Page (`/admin/properties`)
**Purpose**: Manage all properties

**Access**: Private (admin only)

**Features**:
- Property list table:
  - Primary image
  - Title
  - Owner name
  - Category
  - Type
  - Price
  - Location
  - Status (pending, approved, rejected)
  - Submission date
  - Actions (approve, reject, delete)
- Filters:
  - Status (all, pending, approved, rejected)
  - Category
  - Type
  - City
- Search by title or owner
- Pagination
- Bulk actions:
  - Approve selected
  - Reject selected
  - Delete selected
- Property details modal:
  - Full property information
  - All images
  - Owner information
  - Approve/reject with reason
  - View inquiries

**Components to Create**:
- `AdminProperties.js`
- `PropertyTable.js`
- `PropertyRow.js`
- `PropertyFilters.js`
- `PropertyDetailsModal.js`
- `ApproveRejectForm.js`

---

### 5. Additional Pages

#### 5.1 About Page (`/about`)
**Purpose**: Information about the platform

**Features**:
- Company mission and vision
- Team members
- How the platform works
- Contact information

**Components to Create**:
- `About.js`
- `TeamMember.js`

---

#### 5.2 Contact Page (`/contact`)
**Purpose**: Contact form for support

**Features**:
- Contact form:
  - Name
  - Email
  - Subject
  - Message
- Contact information:
  - Email
  - Phone
  - Address
- Social media links

**Components to Create**:
- `Contact.js`
- `ContactForm.js`
- `ContactInfo.js`

---

#### 5.3 404 Not Found Page (`*`)
**Purpose**: Handle invalid routes

**Features**:
- Friendly error message
- Link back to home
- Search bar

**Components to Create**:
- `NotFound.js`

---

## Utility Components to Create

### 1. Loading Components
- `LoadingSpinner.js` - Full page loading
- `ButtonLoader.js` - Button loading state
- `SkeletonCard.js` - Skeleton loading for cards

### 2. Form Components
- `Input.js` - Styled input field
- `Textarea.js` - Styled textarea
- `Select.js` - Styled select dropdown
- `Checkbox.js` - Styled checkbox
- `RadioButton.js` - Styled radio button
- `FileUpload.js` - File upload with preview
- `RangeSlider.js` - Price/area range slider

### 3. UI Components
- `Button.js` - Styled button with variants
- `Badge.js` - Status badges
- `Card.js` - Card container
- `Modal.js` - Modal dialog
- `Dropdown.js` - Dropdown menu
- `Tabs.js` - Tab navigation
- `Alert.js` - Alert messages
- `Toast.js` - Toast notifications
- `Breadcrumb.js` - Breadcrumb navigation
- `EmptyState.js` - Empty state placeholder

### 4. Layout Components
- `Container.js` - Max-width container
- `Grid.js` - Responsive grid
- `Sidebar.js` - Sidebar layout

---

## State Management

### Current Context
- **AuthContext**: User authentication state

### Additional Context Needed
- **PropertyContext**: Property filters and search state
- **NotificationContext**: Toast notifications

---

## API Integration

All API calls are handled through services in `src/services/`:
- `api.js` - Axios configuration
- `authService.js` - Authentication endpoints
- `propertyService.js` - Property endpoints
- `inquiryService.js` - Inquiry endpoints
- `adminService.js` - Admin endpoints

---

## Responsive Design

All pages must be responsive:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

---

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Alt text for images
- Color contrast compliance

---

## Performance Optimization

- Lazy loading for images
- Code splitting for routes
- Memoization for expensive computations
- Debouncing for search inputs
- Pagination for large lists

---

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API services
- Component tests for UI components
- E2E tests for critical user flows

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API base URL updated for production
- [ ] Build optimized for production
- [ ] Images optimized
- [ ] SEO meta tags added
- [ ] Analytics integrated
- [ ] Error tracking setup
- [ ] Performance monitoring

---

## Development Phases

### Phase 1: Core Property Features (Week 1-2)
- Properties list page
- Property details page
- Property filters
- Search functionality

### Phase 2: Property Management (Week 3)
- Add property page
- Edit property page
- My properties page
- Image upload

### Phase 3: Inquiry System (Week 4)
- Inquiries page
- Send inquiry
- Respond to inquiry
- Inquiry notifications

### Phase 4: User Profile (Week 5)
- Profile page
- Edit profile
- Change password
- Profile image upload

### Phase 5: Admin Panel (Week 6-7)
- Admin dashboard
- User management
- Property management
- Statistics and charts

### Phase 6: Additional Pages (Week 8)
- About page
- Contact page
- 404 page
- Footer links

### Phase 7: Polish & Testing (Week 9-10)
- UI/UX improvements
- Bug fixes
- Performance optimization
- Testing
- Documentation

---

## Next Steps

1. Review this documentation
2. Start with Phase 1: Properties List Page
3. Build components incrementally
4. Test each feature before moving to next
5. Push to GitHub after each major feature

---

**Last Updated**: February 19, 2026
**Version**: 1.0
**Status**: 1% Complete (Home, Login, Register, Dashboard)
