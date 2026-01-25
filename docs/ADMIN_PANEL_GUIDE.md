# Admin Panel Guide

## 🎉 Admin Panel is Now Live!

The admin panel has been fully integrated into your Ethiopian Real Estate platform.

## Quick Start

### Step 1: Create Admin Account

Run this command to create an admin user:

```bash
cd backend
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@ethiopiarealestate.com`
- Password: `admin123`

⚠️ **Important:** Change the password after first login!

### Step 2: Login as Admin

1. Go to `/login`
2. Enter admin credentials
3. You'll see an "Admin" link in the navbar
4. Click it to access the admin panel

### Step 3: Approve Your Test Account

1. In the admin panel, click "Users" or "Manage Users"
2. Find your test account
3. Click "Approve"
4. Logout and login with your test account
5. You can now create properties!

## Admin Panel Features

### 📊 Dashboard (`/admin`)
- **Statistics Overview**
  - Total users
  - Total properties
  - Pending properties
  - Total inquiries
  
- **Recent Users Table**
  - View latest registrations
  - See approval status
  - Quick access to user management

- **Pending Properties**
  - Review properties awaiting approval
  - Quick approve/reject actions
  - View property details

### 👥 User Management (`/admin/users`)
- **View All Users**
  - Complete user list with details
  - Filter by role (buyer, seller, landlord, agent)
  - Filter by status (approved/pending)

- **User Actions**
  - Approve user accounts
  - Reject user accounts
  - View user information

- **User Roles**
  - **Buyer**: Auto-approved, can browse and inquire
  - **Seller/Landlord/Agent**: Require approval to list properties
  - **Admin**: Full platform access

### 🏠 Property Management (`/admin/properties`)
- **Filter Properties**
  - Pending (awaiting approval)
  - Approved (live on platform)
  - Rejected (declined listings)
  - All (complete list)

- **Property Actions**
  - Approve properties
  - Reject properties (with reason)
  - View property details
  - See owner information

- **Property Information**
  - Title, description, location
  - Price and area
  - Owner details (name, email, phone)
  - Images
  - View count

### 💬 Inquiries (`/admin/inquiries`)
- Coming soon...
- View all inquiries
- Monitor user interactions

## Navigation

### Admin Sidebar
- **Dashboard**: Overview and statistics
- **Users**: Manage user accounts
- **Properties**: Review property listings
- **Inquiries**: View user inquiries

### Quick Actions
- Back to Dashboard button
- Direct links to management pages
- User info display in sidebar

## User Approval Workflow

### For Property Listers (Sellers, Landlords, Agents):

1. **User Registers**
   - Chooses role during registration
   - Account created with `isApproved = false`

2. **Admin Reviews**
   - Admin sees user in "Pending" list
   - Reviews user information
   - Decides to approve or reject

3. **User Approved**
   - User can now list properties
   - Properties still need approval
   - Full platform access granted

4. **Property Submission**
   - User creates property listing
   - Property status: "pending"
   - Awaits admin approval

5. **Property Approval**
   - Admin reviews property
   - Approves or rejects with reason
   - Approved properties go live

### For Buyers:
- Auto-approved upon registration
- Can browse and inquire immediately
- No admin approval needed

## Security Features

### Access Control
- Only admin users can access `/admin/*` routes
- Protected by authentication middleware
- Automatic redirect for non-admin users

### Role-Based Permissions
- Admin: Full access to all features
- Regular users: Cannot access admin panel
- Unauthenticated: Redirected to login

## Tips & Best Practices

### 1. Regular Monitoring
- Check pending users daily
- Review property submissions promptly
- Monitor platform statistics

### 2. Quality Control
- Verify user information before approval
- Check property details and images
- Ensure listings meet platform standards

### 3. Communication
- Provide clear rejection reasons
- Help users improve their listings
- Maintain professional standards

### 4. Security
- Change default admin password
- Use strong, unique passwords
- Log out when not in use
- Monitor admin activity

## Troubleshooting

### Cannot Access Admin Panel
**Problem:** "Access denied" or redirect to dashboard

**Solutions:**
1. Verify you're logged in as admin
2. Check user role in database:
   ```bash
   mongosh
   use ethiopian_real_estate
   db.users.findOne({ email: "your-email@example.com" })
   ```
3. Ensure role is set to 'admin'

### Users Not Showing
**Problem:** User list is empty

**Solutions:**
1. Check database connection
2. Verify users exist in database
3. Check browser console for errors
4. Refresh the page

### Cannot Approve Users
**Problem:** Approve button doesn't work

**Solutions:**
1. Check backend is running
2. Verify API endpoint `/admin/users/:id/approve`
3. Check browser console for errors
4. Verify admin authentication

### Properties Not Loading
**Problem:** Property list is empty

**Solutions:**
1. Check filter selection (pending/approved/all)
2. Verify properties exist in database
3. Check backend logs
4. Refresh the page

## API Endpoints Used

### Admin Dashboard
- `GET /api/admin/dashboard` - Get statistics and overview

### User Management
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/approve` - Approve user
- `PUT /api/admin/users/:id/reject` - Reject user

### Property Management
- `GET /api/admin/properties` - List all properties
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property

## Next Steps

1. ✅ Create admin account
2. ✅ Login and explore admin panel
3. ✅ Approve your test accounts
4. ✅ Test property creation workflow
5. ✅ Review and approve properties
6. 🔄 Add more admin features (coming soon)

## Future Enhancements

- [ ] Bulk user approval
- [ ] Advanced filtering and search
- [ ] User activity logs
- [ ] Email notifications
- [ ] Property analytics
- [ ] Revenue tracking
- [ ] Report generation
- [ ] User messaging system

## Support

If you encounter any issues:
1. Check this guide first
2. Review browser console for errors
3. Check backend logs
4. Verify database connection
5. Ensure all dependencies are installed

---

**Admin Panel Version:** 1.0.0  
**Last Updated:** January 2026
