# Admin Setup Guide

## Quick Start - Approve Your Account

If you just registered and need to test the platform immediately, you have two options:

### Option 1: Use the Approval Script (Fastest)

Run this command to approve your account:

```bash
cd backend
node scripts/approveUser.js your-email@example.com
```

Replace `your-email@example.com` with the email you registered with.

### Option 2: Create Admin Account and Use Admin Panel

1. **Create an admin account:**
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```

   This creates an admin account with:
   - Email: `admin@ethiopiarealestate.com`
   - Password: `admin123`

2. **Login as admin:**
   - Go to `/login`
   - Use the admin credentials above
   - ⚠️ Change the password after first login!

3. **Approve users:**
   - Go to Admin Dashboard
   - Click "Manage Users"
   - Find your user account
   - Click "Approve"

## Admin Features

### Admin Dashboard
- View platform statistics
- See recent users
- Review pending properties
- Quick actions for common tasks

### User Management
- View all users
- Filter by role and status
- Approve/reject user accounts
- Monitor user activity

### Property Management
- View all properties
- Filter by status
- Approve/reject property listings
- View property details

## Admin Routes

- `/admin` - Admin Dashboard
- `/admin/users` - Manage Users
- `/admin/properties` - Manage Properties
- `/admin/inquiries` - View Inquiries

## User Approval Workflow

### For Sellers, Landlords, and Agents:
1. User registers with their role
2. Account is created but `isApproved = false`
3. User cannot list properties until approved
4. Admin reviews and approves the account
5. User can now list properties

### For Buyers:
- Auto-approved upon registration
- Can browse and inquire immediately
- No admin approval needed

## Security Notes

1. **Change Default Password**
   - The default admin password is `admin123`
   - Change it immediately after first login
   - Use a strong, unique password

2. **Admin Access**
   - Only admin users can access admin routes
   - Protected by authentication middleware
   - Regular users cannot access admin panel

3. **Production Setup**
   - Never commit admin credentials
   - Use environment variables for sensitive data
   - Enable 2FA for admin accounts (future feature)

## Troubleshooting

### "User not found" error
- Check that you're using the correct email
- Verify the user exists in the database

### "Access denied" error
- Make sure you're logged in as admin
- Check that your role is set to 'admin'

### Cannot approve users
- Verify admin routes are properly configured
- Check backend logs for errors
- Ensure MongoDB connection is working

## Scripts Reference

### Create Admin User
```bash
node scripts/createAdmin.js
```
Creates a new admin user with default credentials.

### Approve User
```bash
node scripts/approveUser.js <email>
```
Approves a specific user account by email.

### List All Users (MongoDB Shell)
```bash
mongosh
use ethiopian_real_estate
db.users.find({}, { firstName: 1, lastName: 1, email: 1, role: 1, isApproved: 1 })
```

### Approve User (MongoDB Shell)
```bash
mongosh
use ethiopian_real_estate
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isApproved: true, isVerified: true } }
)
```

## Next Steps

After setting up admin access:

1. ✅ Approve your test accounts
2. ✅ Test property creation
3. ✅ Review property approval workflow
4. ✅ Test the complete user journey
5. ✅ Configure production admin accounts
