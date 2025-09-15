# 🚀 GoingGone Backend Setup Guide

This guide will help you set up the backend database and API for GoingGone.

## 📋 Prerequisites

Before starting, you'll need:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** - [Download here](https://www.postgresql.org/download/)

## 🗄️ Database Setup

### Step 1: Install PostgreSQL
- Download and install PostgreSQL from the official website
- During installation, remember the password you set for the `postgres` user
- Make sure PostgreSQL is running as a service

### Step 2: Create Database
Open a terminal and run:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE goinggone;

# Exit psql
\q
```

### Step 3: Update Database Connection
Edit the file `backend/.env` and update the `DATABASE_URL`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/goinggone?schema=public"
```
Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Database Schema
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations (creates tables)
npm run db:migrate

# Seed the database with popular brands
npm run db:seed
```

### Step 4: Start the Backend Server
```bash
# Development mode (recommended)
npm run dev
```

The API will be available at `http://localhost:3001`

## 🧪 Test the Setup

### Test 1: Health Check
Open your browser and go to: `http://localhost:3001/health`
You should see: `{"status":"OK","timestamp":"..."}`

### Test 2: View Database
```bash
# Open Prisma Studio (visual database browser)
npm run db:studio
```
This will open a web interface where you can see your database tables and data.

### Test 3: Test Sign-Up
1. Start your frontend: `cd frontend && npm run dev`
2. Go to `http://localhost:5173`
3. Click "Join Waitlist" or navigate to Sign Up
4. Fill out the form and submit
5. Check Prisma Studio to see the new user data

## 📊 What You'll Have

After setup, you'll have:

- **Users table** - Stores user information from sign-up forms
- **Brands table** - Contains popular brands (pre-seeded)
- **UserBrands table** - Links users to their selected brands
- **API endpoints** for creating users and retrieving data
- **Visual database browser** (Prisma Studio)

## 🔍 Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your password in the `.env` file
- Verify the database name is `goinggone`

### Port Already in Use
- If port 3001 is busy, change the `PORT` in `backend/.env`
- Update the frontend API calls to use the new port

### CORS Issues
- Make sure your frontend is running on `http://localhost:5173`
- Check the CORS settings in `backend/server.js`

## 🎉 Next Steps

Once everything is working:

1. **Test the sign-up form** - Submit a few test users
2. **View the data** - Use Prisma Studio to see your users and their brand preferences
3. **Analyze brand popularity** - Check which brands users select most often
4. **Add new features** - Create more API endpoints as needed

## 📚 Useful Commands

```bash
# Backend development
npm run dev          # Start server with auto-restart
npm run db:studio    # Open database browser
npm run db:migrate   # Apply database changes
npm run db:seed      # Add sample data

# Frontend development
cd frontend
npm run dev          # Start frontend server
```

## 🆘 Need Help?

If you encounter issues:
1. Check the terminal for error messages
2. Verify PostgreSQL is running
3. Make sure all dependencies are installed
4. Check that ports 3001 and 5173 are available

The backend is now ready to store your sign-up form data! 🚀
