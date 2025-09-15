// Test script for AWIN integration
require('dotenv').config();
const AwinService = require('./services/awinService');

async function testAwinIntegration() {
  console.log('🧪 Testing AWIN Integration...\n');
  
  const awinService = new AwinService();
  
  try {
    // Test 1: Check configuration
    console.log('1️⃣ Checking configuration...');
    console.log(`   API Key: ${awinService.apiKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`   Publisher ID: ${awinService.publisherId ? '✅ Set' : '❌ Missing'}`);
    console.log(`   Feed ID: ${process.env.AWIN_FEED_ID ? '✅ Set' : '❌ Missing (awaiting approval)'}`);
    console.log(`   Min Discount: ${awinService.minDiscountPercent}%`);
    console.log(`   Max Brands: ${awinService.maxBrandsToFetch}`);
    console.log(`   Max Products per Brand: ${awinService.maxProductsPerBrand}\n`);
    
    // Test 2: Get popular brands
    console.log('2️⃣ Getting popular brands...');
    const popularBrands = await awinService.getPopularBrands();
    console.log(`   Found ${popularBrands.length} popular brands:`, popularBrands);
    console.log();
    
    if (popularBrands.length === 0) {
      console.log('⚠️  No popular brands found. You need users to sign up and select brands first.\n');
    }
    
    // Test 3: Test product feed (if API key is set)
    if (awinService.apiKey && process.env.AWIN_FEED_ID) {
      console.log('3️⃣ Testing product feed download...');
      try {
        const products = await awinService.fetchAwinProductFeed();
        console.log(`   Downloaded ${products.length} products from AWIN feed`);
        
        if (products.length > 0) {
          console.log('   Sample product:', {
            name: products[0].product_name,
            merchant: products[0].merchant_name,
            price: products[0].search_price
          });
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
      console.log();
    } else {
      console.log('3️⃣ Skipping product feed test (API credentials not set)\n');
    }
    
    // Test 4: Test discount calculation
    console.log('4️⃣ Testing discount calculation...');
    const testProduct = {
      product_name: 'Nike Air Max 50% Off Sale',
      search_price: 100,
      store_price: 50,
      display_price: 50
    };
    
    const discount = awinService.calculateDiscountPercent(testProduct);
    console.log(`   Test product discount: ${discount}%`);
    console.log(`   Meets threshold (${awinService.minDiscountPercent}%): ${discount >= awinService.minDiscountPercent ? '✅' : '❌'}`);
    console.log();
    
    // Test 5: Get current database stats
    console.log('5️⃣ Database statistics...');
    const stats = await awinService.getDiscountStats();
    if (stats) {
      console.log(`   Total products: ${stats.totalProducts}`);
      console.log(`   Average discount: ${stats.averageDiscount}%`);
      console.log(`   Min discount: ${stats.minDiscount}%`);
      console.log(`   Max discount: ${stats.maxDiscount}%`);
      console.log(`   High discount products: ${stats.highDiscountProducts}`);
    } else {
      console.log('   No products in database yet');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await awinService.cleanup();
  }
}

// Run the test
testAwinIntegration();
