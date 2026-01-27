# Troubleshooting Guide

## Login Issues

### Problem: Can't Login

#### Check 1: Is Backend Running?
Make sure your backend server is running:

```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

#### Check 2: Did You Register First?
You need to register an account before logging in:

1. Go to `/register`
2. Fill in all fields
3. Choose a role (buyer, seller, landlord, agent)
4. Click Register
5. Then try logging in

#### Check 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try logging in
4. Look for error messages

Common errors:
- **Network Error**: Backend not running
- **401 Unauthorized**: Wrong email/password
- **404 Not Found**: API endpoint issue

#### Check 4: Verify API Connection

Open browser console and run:
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
})
.then(r => r.json())
.then(console.log)
```

#### Check 5: Database Connection
Make sure MongoDB is running and connected:

```bash
# Check if MongoDB is running
mongosh

# In mongosh, check users
use ethiopian_real_estate
db.users.find()
```

### Problem: "Invalid Credentials" Error

**Cause**: Wrong email or password

**Solutions**:
1. Double-check your email and password
2. Passwords are case-sensitive
3. Make sure you registered with that email

**Reset Password** (if needed):
```bash
cd backend
node scripts/resetPassword.js your-email@example.com newpassword123
```

### Problem: Login Button Not Working

**Cause**: Form validation or JavaScript error

**Solutions**:
1. Check browser console for errors
2. Make sure all fields are filled
3. Email must be valid format
4. Password must be at least 6 characters

### Problem: "User Not Found" Error

**Cause**: Account doesn't exist

**Solutions**:
1. Register a new account first
2. Check if you're using the correct email
3. Verify user exists in database:
   ```bash
   mongosh
   use ethiopian_real_estate
   db.users.findOne({ email: "your-email@example.com" })
   ```

## Registration Issues

### Problem: Can't Register

#### Check 1: All Fields Required
Make sure you fill in:
- First Name
- Last Name
- Email (valid format)
- Phone (valid format)
- Password (min 6 characters)
- Confirm Password (must match)
- Role (select one)

#### Check 2: Email Already Exists
If you see "User already exists":
- Use a different email
- Or login with existing account

#### Check 3: Phone Already Exists
Each phone number can only be used once:
- Use a different phone number
- Or login with existing account

## Backend Issues

### Problem: Backend Won't Start

#### Error: "Port 5000 already in use"
**Solution**: Kill the process using port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

#### Error: "MongoDB connection failed"
**Solutions**:
1. Check `.env` file has correct `MONGO_URI`
2. Make sure MongoDB is running
3. Check internet connection (if using MongoDB Atlas)
4. Verify MongoDB credentials

#### Error: "JWT_SECRET not defined"
**Solution**: Add to `.env` file:
```
JWT_SECRET=your-secret-key-here-make-it-long-and-random
JWT_EXPIRE=30d
```

## Frontend Issues

### Problem: Frontend Won't Start

#### Error: "Port 5173 already in use"
**Solution**: Kill the process or use different port
```bash
# Kill process
# Windows: Use Task Manager
# Mac/Linux: lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

#### Error: "Module not found"
**Solution**: Install dependencies
```bash
cd frontend
npm install
```

### Problem: API Calls Failing

#### Check API Base URL
In `frontend/src/services/api.js`, verify:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})
```

#### Check CORS
Backend should have CORS enabled in `server.js`:
```javascript
app.use(cors())
```

## Database Issues

### Problem: Can't Connect to MongoDB

#### Using MongoDB Atlas (Cloud)
1. Check internet connection
2. Verify connection string in `.env`
3. Whitelist your IP address in Atlas
4. Check username/password

#### Using Local MongoDB
1. Make sure MongoDB is installed
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Problem: Database Empty

**Solution**: Seed the database or register users manually

## Common Error Messages

### "Network Error"
- Backend not running
- Wrong API URL
- CORS issue

### "401 Unauthorized"
- Wrong credentials
- Token expired
- Not logged in

### "403 Forbidden"
- Insufficient permissions
- Account not approved
- Wrong role

### "404 Not Found"
- Wrong API endpoint
- Route not configured
- Backend not running

### "500 Internal Server Error"
- Backend error
- Database error
- Check backend logs

## Quick Fixes

### Reset Everything
```bash
# Stop all servers
# Ctrl+C in all terminals

# Clear browser data
# DevTools > Application > Clear Storage

# Restart backend
cd backend
npm start

# Restart frontend (new terminal)
cd frontend
npm run dev
```

### Create Test Account
```bash
cd backend
node scripts/createTestUser.js
```

### Check Logs
```bash
# Backend logs
cd backend
npm start
# Watch for errors

# Frontend logs
# Open browser DevTools > Console
```

## Still Having Issues?

1. **Check all servers are running**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173
   - MongoDB: Running

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R
   - Clear localStorage
   - Try incognito mode

3. **Check environment variables**
   - `.env` file exists in backend
   - All required variables set
   - No typos in variable names

4. **Verify dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

5. **Check file permissions**
   - Make sure you can read/write files
   - Check folder permissions

## Getting Help

When asking for help, provide:
1. Error message (exact text)
2. What you were trying to do
3. Browser console errors
4. Backend terminal output
5. Steps to reproduce

## Useful Commands

```bash
# Check if port is in use
netstat -ano | findstr :5000

# Check MongoDB status
mongosh
show dbs

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```
