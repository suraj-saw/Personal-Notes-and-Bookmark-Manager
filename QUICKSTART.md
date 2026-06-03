# Quick Start Guide - Notes & Bookmark Manager

Get the application up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
-  Node.js (v14 or higher) - Check: `node --version`
-  npm - Check: `npm --version`
-  MongoDB installed or MongoDB Atlas account

## Step-by-Step Setup

### Step 1: Install MongoDB (if not already installed)

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a free cluster
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/database`)

#### Option B: Local MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
Download from https://www.mongodb.com/try/download/community
```

### Step 2: Backend Setup (5 steps)

```bash
# 1. Navigate to backend directory
cd notes-bookmark-manager/backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env file with your settings
# For local MongoDB:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmark-manager
JWT_SECRET=my_super_secret_key_change_this_in_production
NODE_ENV=development

# For MongoDB Atlas:
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-manager
JWT_SECRET=my_super_secret_key_change_this_in_production
NODE_ENV=development

# 5. Start the backend server
npm run dev
```

 Backend should now be running on `http://localhost:5000`

### Step 3: Frontend Setup (4 steps)

Open a NEW terminal window:

```bash
# 1. Navigate to frontend directory
cd notes-bookmark-manager/frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# 4. Start the frontend server
npm run dev
```

 Frontend should now be running on `http://localhost:3000`

### Step 4: Test the Application

1. Open your browser and go to: `http://localhost:3000`
2. Click "Register here" to create a new account
3. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
4. Click "Register"
5. You'll be automatically logged in and redirected to the Notes page
6. Click "New Note" to create your first note!

## Quick Test Commands

### Test Backend API (using cURL)

```bash
# Health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'

# Login (save the token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Create a note (replace YOUR_TOKEN with the token from login)
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Note","content":"My first note!","tags":["test"]}'
```

## Common Issues & Solutions

### Issue 1: MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Check if MongoDB is running: `mongod --version`
- Start MongoDB service
- Verify MONGODB_URI in `.env` file
- For Atlas, check your IP whitelist

### Issue 2: Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Find and kill the process using port 5000
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env to different port like 5001
```

### Issue 3: Cannot Find Module
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Frontend API Connection Error
**Error:** `Network Error` or `CORS Error`

**Solution:**
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Verify CORS is enabled in backend (it is by default)

## Production Deployment Checklist

Before deploying to production:

1.  Change JWT_SECRET to a strong random string
2.  Update MONGODB_URI to production database
3.  Set NODE_ENV=production
4.  Update NEXT_PUBLIC_API_URL to production API URL
5.  Enable HTTPS
6.  Set up proper database backups
7.  Configure environment variables on hosting platform

## Next Steps

-  Read the full [README.md](README.md) for detailed documentation
-  Import [postman_collection.json](postman_collection.json) to test API
-  Check [backend/README.md](backend/README.md) for API documentation
-  Check [frontend/README.md](frontend/README.md) for UI documentation

## Support

If you encounter any issues:
1. Check the error message carefully
2. Review the README files
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Check that both backend and frontend servers are running

## Features Overview

Once running, you can:
-  Create and manage notes
-  Save and organize bookmarks
-  Search by text
-  Filter by tags
-  Mark favorites
-  Auto-fetch bookmark titles from URLs

Enjoy your Notes & Bookmark Manager! 
