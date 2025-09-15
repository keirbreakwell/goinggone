const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const AwinService = require('./services/awinService');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Initialize AWIN service
const awinService = new AwinService();

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

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { limit = 50, offset = 0, brand } = req.query;
    
    let products;
    if (brand) {
      products = await awinService.getProductsByBrand(brand, parseInt(limit));
    } else {
      products = await awinService.getProducts(parseInt(limit), parseInt(offset));
    }
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by brand
app.get('/api/products/brand/:brandName', async (req, res) => {
  try {
    const { brandName } = req.params;
    const { limit = 50 } = req.query;
    
    const products = await awinService.getProductsByBrand(brandName, parseInt(limit));
    res.json(products);
  } catch (error) {
    console.error('Get products by brand error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual trigger for product update
app.post('/api/products/update', async (req, res) => {
  try {
    await awinService.updateProducts();
    res.json({ message: 'Product update triggered successfully' });
  } catch (error) {
    console.error('Manual product update error:', error);
    res.status(500).json({ error: 'Failed to update products' });
  }
});

// Get discount statistics
app.get('/api/products/stats', async (req, res) => {
  try {
    const stats = await awinService.getDiscountStats();
    res.json(stats);
  } catch (error) {
    console.error('Get discount stats error:', error);
    res.status(500).json({ error: 'Failed to get discount statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  
  // Start AWIN service for periodic product updates
  awinService.startPeriodicUpdates();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  
  // Stop AWIN service
  await awinService.cleanup();
  
  // Disconnect from database
  await prisma.$disconnect();
  
  console.log('✅ Shutdown complete');
  process.exit(0);
});

module.exports = app;
