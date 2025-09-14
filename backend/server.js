const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'GoingGone API is running!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Sign up endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, selectedBrands, otherBrand } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        error: 'First name, last name, and email are required' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        otherBrands: otherBrand || null
      }
    });

    // Add selected brands if any
    if (selectedBrands && selectedBrands.length > 0) {
      for (const brandName of selectedBrands) {
        // Find or create brand
        let brand = await prisma.brand.findFirst({
          where: { name: brandName }
        });

        if (!brand) {
          brand = await prisma.brand.create({
            data: { name: brandName }
          });
        }

        // Create user-brand relationship
        await prisma.userBrand.create({
          data: {
            userId: user.id,
            brandId: brand.id
          }
        });
      }
    }

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all users (for admin purposes)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userBrands: {
          include: {
            brand: true
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all brands
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { userBrands: true }
        }
      },
      orderBy: {
        userBrands: {
          _count: 'desc'
        }
      }
    });

    res.json(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
