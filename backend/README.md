# GoingGone Backend API

This is the backend API for GoingGone, built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
1. Install PostgreSQL on your machine
2. Create a database called `goinggone`
3. Update the `DATABASE_URL` in `.env` with your database credentials:
   ```
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/goinggone?schema=public"
   ```

### 3. Set Up Database Schema
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with popular brands
npm run db:seed
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## 📊 Database Schema

### Users Table
- `id` - Unique identifier
- `firstName` - User's first name
- `lastName` - User's last name
- `email` - User's email (unique)
- `otherBrands` - Additional brands not in our list
- `createdAt` - When the user signed up
- `updatedAt` - Last updated

### Brands Table
- `id` - Unique identifier
- `name` - Brand name (unique)
- `createdAt` - When the brand was added
- `updatedAt` - Last updated

### UserBrands Table (Many-to-Many)
- `id` - Unique identifier
- `userId` - Reference to user
- `brandId` - Reference to brand
- Ensures a user can't select the same brand twice

## 🔌 API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### User Management
- `POST /api/signup` - Create a new user
- `GET /api/users` - Get all users (admin)

### Brand Management
- `GET /api/brands` - Get all brands with popularity count

## 📝 Example API Usage

### Sign Up a User
```bash
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "selectedBrands": ["Nike", "Apple", "Zara"],
    "otherBrand": "Patagonia, Allbirds"
  }'
```

### Get All Brands
```bash
curl http://localhost:3001/api/brands
```

## 🛠️ Development Tools

- **Prisma Studio**: `npm run db:studio` - Visual database browser
- **Database Migrations**: `npm run db:migrate` - Apply schema changes
- **Seed Database**: `npm run db:seed` - Populate with initial data

## 🔧 Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
