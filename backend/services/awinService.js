const { PrismaClient } = require('@prisma/client');
const config = require('../config/awin');

class AwinService {
  constructor() {
    this.prisma = new PrismaClient();
    this.apiKey = process.env.AWIN_API_KEY;
    this.publisherId = process.env.AWIN_PUBLISHER_ID;
    this.baseUrl = process.env.AWIN_API_BASE_URL || config.apiBaseUrl;
    this.isRunning = false;
    
    // Configuration for data management
    this.maxProductsPerBrand = config.maxProductsPerBrand;
    this.maxBrandsToFetch = config.maxBrandsToFetch;
    this.minUpdateInterval = config.minUpdateInterval;
    this.minDiscountPercent = config.minDiscountPercent;
    this.rateLimitDelay = config.rateLimitDelay;
    this.lastUpdate = null;
  }

  /**
   * Fetch products from AWIN product feed with smart filtering
   * Only fetches products from brands our users are interested in
   */
  async fetchProducts() {
    if (!this.apiKey) {
      console.error('❌ AWIN API key not configured');
      return [];
    }

    try {
      console.log('🔄 Fetching products from AWIN product feed...');
      
      // First, get the brands our users are interested in
      const popularBrands = await this.getPopularBrands();
      
      if (popularBrands.length === 0) {
        console.log('ℹ️  No popular brands found, skipping AWIN fetch');
        return [];
      }

      console.log(`🎯 Filtering products for ${popularBrands.length} popular brands:`, popularBrands);
      
      // Fetch the full product feed from AWIN
      const allProducts = await this.fetchAwinProductFeed();
      
      // Filter products by popular brands and discount criteria
      const filteredProducts = this.filterProductsByBrandsAndDiscount(allProducts, popularBrands);
      
      console.log(`✅ Filtered ${filteredProducts.length} products from ${allProducts.length} total products`);
      return filteredProducts;
      
    } catch (error) {
      console.error('❌ Error fetching products from AWIN:', error.message);
      return [];
    }
  }

  /**
   * Get popular brands from our database (brands users have selected)
   */
  async getPopularBrands() {
    try {
      const brands = await this.prisma.brand.findMany({
        where: {
          userBrands: {
            some: {} // Only brands that have at least one user
          }
        },
        orderBy: {
          userBrands: {
            _count: 'desc'
          }
        },
        take: 20 // Limit to top 20 brands
      });
      
      return brands.map(brand => brand.name);
    } catch (error) {
      console.error('❌ Error fetching popular brands:', error);
      return [];
    }
  }

  /**
   * Fetch AWIN product feed (CSV format)
   * This uses AWIN's actual product feed API
   */
  async fetchAwinProductFeed() {
    try {
      // AWIN product feed URL - you'll need to get your feed ID from AWIN dashboard
      const feedId = process.env.AWIN_FEED_ID || 'YOUR_FEED_ID';
      const feedUrl = `https://productdata.awin.com/datafeed/download/apikey/${this.apiKey}/language/en/fid/${feedId}/columns/aw_product_id,product_name,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/none/adultcontent/1/`;
      
      console.log('📥 Downloading AWIN product feed...');
      const response = await fetch(feedUrl);
      
      if (!response.ok) {
        throw new Error(`AWIN feed download error: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      return this.parseCsvFeed(csvText);
      
    } catch (error) {
      console.error('❌ Error fetching AWIN product feed:', error.message);
      return [];
    }
  }

  /**
   * Parse CSV product feed from AWIN
   */
  parseCsvFeed(csvText) {
    const lines = csvText.split('\n');
    const products = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = line.split(',');
      if (columns.length < 10) continue; // Skip malformed rows
      
      try {
        const product = {
          aw_product_id: columns[0],
          product_name: columns[1],
          merchant_product_id: columns[2],
          merchant_image_url: columns[3],
          description: columns[4],
          merchant_category: columns[5],
          search_price: parseFloat(columns[6]) || 0,
          merchant_name: columns[7],
          merchant_id: columns[8],
          category_name: columns[9],
          category_id: columns[10],
          aw_image_url: columns[11],
          currency: columns[12],
          store_price: parseFloat(columns[13]) || 0,
          delivery_cost: parseFloat(columns[14]) || 0,
          merchant_deep_link: columns[15],
          language: columns[16],
          last_updated: columns[17],
          display_price: parseFloat(columns[18]) || 0,
          data_feed_id: columns[19]
        };
        
        products.push(product);
      } catch (error) {
        console.warn(`⚠️  Skipping malformed product row: ${line}`);
      }
    }
    
    console.log(`📊 Parsed ${products.length} products from CSV feed`);
    return products;
  }

  /**
   * Filter products by popular brands and discount criteria
   */
  filterProductsByBrandsAndDiscount(allProducts, popularBrands) {
    const filteredProducts = [];
    const brandSet = new Set(popularBrands.map(brand => brand.toLowerCase()));
    
    for (const product of allProducts) {
      // Check if product brand matches our popular brands
      const productBrand = this.extractBrandFromProduct(product);
      if (!brandSet.has(productBrand.toLowerCase())) {
        continue;
      }
      
      // Check if product meets discount criteria
      if (this.hasMinimumDiscount(product)) {
        const transformedProduct = this.transformAwinProduct(product);
        if (transformedProduct) {
          filteredProducts.push(transformedProduct);
        }
      }
    }
    
    return filteredProducts;
  }

  /**
   * Extract brand name from product data
   */
  extractBrandFromProduct(product) {
    // Try to extract brand from product name or category
    const productName = product.product_name || '';
    const category = product.category_name || '';
    
    // Simple brand extraction - you might need to enhance this
    const brandKeywords = ['nike', 'adidas', 'levi', 'zara', 'h&m', 'uniqlo', 'gap'];
    
    for (const keyword of brandKeywords) {
      if (productName.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)) {
        return keyword.charAt(0).toUpperCase() + keyword.slice(1);
      }
    }
    
    // Fallback to first word of product name
    return productName.split(' ')[0] || 'Unknown';
  }

  /**
   * Transform AWIN product to our Product model format
   */
  transformAwinProduct(awinProduct) {
    try {
      const discountPercent = this.calculateDiscountPercent(awinProduct);
      
      return {
        awinId: parseInt(awinProduct.aw_product_id) || 0,
        retailer: awinProduct.merchant_name || 'Unknown Retailer',
        brand: this.extractBrandFromProduct(awinProduct),
        name: awinProduct.product_name || awinProduct.description || 'Product Name',
        price: awinProduct.search_price || awinProduct.store_price || awinProduct.display_price || 0,
        discount: discountPercent,
        url: awinProduct.merchant_deep_link || '#',
        imageUrl: awinProduct.merchant_image_url || awinProduct.aw_image_url || 'https://via.placeholder.com/300x300?text=No+Image'
      };
    } catch (error) {
      console.warn('⚠️  Error transforming AWIN product:', error.message);
      return null;
    }
  }

  /**
   * Validate if a product has the minimum required data
   */
  isValidProduct(item) {
    return (
      item.aw_product_id && 
      item.merchant_name && 
      item.product_name && 
      (item.search_price > 0 || item.store_price > 0 || item.display_price > 0)
    );
  }

  /**
   * Check if product has minimum discount percentage
   */
  hasMinimumDiscount(item) {
    const discountPercent = this.calculateDiscountPercent(item);
    return discountPercent >= this.minDiscountPercent;
  }

  /**
   * Calculate discount percentage from AWIN data
   * AWIN doesn't always provide discount info, so we'll estimate based on price patterns
   */
  calculateDiscountPercent(item) {
    // AWIN typically provides search_price, store_price, and display_price
    const searchPrice = parseFloat(item.search_price) || 0;
    const storePrice = parseFloat(item.store_price) || 0;
    const displayPrice = parseFloat(item.display_price) || 0;
    
    // Use the highest price as "original" and lowest as "sale" price
    const prices = [searchPrice, storePrice, displayPrice].filter(p => p > 0);
    if (prices.length < 2) return 0;
    
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    
    // Only calculate discount if there's a significant price difference
    if (maxPrice > minPrice && minPrice > 0) {
      const discount = Math.round(((maxPrice - minPrice) / maxPrice) * 100);
      return discount;
    }
    
    // Alternative: Look for discount indicators in product name/description
    const productText = (item.product_name + ' ' + (item.description || '')).toLowerCase();
    const discountMatches = productText.match(/(\d+)%?\s*(off|discount|sale)/);
    if (discountMatches) {
      return parseInt(discountMatches[1]);
    }
    
    return 0; // No discount if we can't calculate
  }

  /**
   * Save products to database
   */
  async saveProducts(products) {
    if (!products || products.length === 0) {
      console.log('ℹ️  No products to save');
      return;
    }

    try {
      console.log(`💾 Saving ${products.length} products to database...`);
      
      for (const product of products) {
        await this.prisma.product.upsert({
          where: { awinId: product.awinId },
          update: {
            retailer: product.retailer,
            brand: product.brand,
            name: product.name,
            price: product.price,
            discount: product.discount,
            url: product.url,
            imageUrl: product.imageUrl,
            updatedAt: new Date()
          },
          create: product
        });
      }
      
      console.log(`✅ Successfully saved ${products.length} products to database`);
      
    } catch (error) {
      console.error('❌ Error saving products to database:', error);
    }
  }

  /**
   * Main method to fetch and save products
   */
  async updateProducts() {
    if (this.isRunning) {
      console.log('⏳ Product update already in progress, skipping...');
      return;
    }

    // Check if enough time has passed since last update
    if (this.lastUpdate && (Date.now() - this.lastUpdate) < this.minUpdateInterval) {
      console.log('⏳ Too soon for next update, skipping...');
      return;
    }

    this.isRunning = true;
    
    try {
      const products = await this.fetchProducts();
      await this.saveProducts(products);
      this.lastUpdate = Date.now();
    } catch (error) {
      console.error('❌ Error in updateProducts:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Start the periodic product updates (every minute)
   */
  startPeriodicUpdates() {
    console.log('🚀 Starting AWIN product updates every minute...');
    
    // Run immediately
    this.updateProducts();
    
    // Then run every minute
    this.intervalId = setInterval(() => {
      this.updateProducts();
    }, 60000); // 60 seconds = 1 minute
  }

  /**
   * Stop the periodic updates
   */
  stopPeriodicUpdates() {
    if (this.intervalId) {
      console.log('⏹️  Stopping AWIN product updates...');
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Get products from database
   */
  async getProducts(limit = 50, offset = 0) {
    try {
      const products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy: { updatedAt: 'desc' }
      });
      
      return products;
    } catch (error) {
      console.error('❌ Error fetching products from database:', error);
      return [];
    }
  }

  /**
   * Get products by brand
   */
  async getProductsByBrand(brandName, limit = 50) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          brand: {
            contains: brandName,
            mode: 'insensitive'
          }
        },
        take: limit,
        orderBy: { updatedAt: 'desc' }
      });
      
      return products;
    } catch (error) {
      console.error('❌ Error fetching products by brand:', error);
      return [];
    }
  }

  /**
   * Get discount statistics
   */
  async getDiscountStats() {
    try {
      const stats = await this.prisma.product.aggregate({
        _count: { id: true },
        _avg: { discount: true },
        _min: { discount: true },
        _max: { discount: true }
      });

      const highDiscountCount = await this.prisma.product.count({
        where: {
          discount: {
            gte: this.minDiscountPercent
          }
        }
      });

      return {
        totalProducts: stats._count.id,
        averageDiscount: Math.round(stats._avg.discount || 0),
        minDiscount: Math.round(stats._min.discount || 0),
        maxDiscount: Math.round(stats._max.discount || 0),
        highDiscountProducts: highDiscountCount,
        minDiscountThreshold: this.minDiscountPercent
      };
    } catch (error) {
      console.error('❌ Error fetching discount stats:', error);
      return null;
    }
  }

  /**
   * Cleanup method
   */
  async cleanup() {
    this.stopPeriodicUpdates();
    await this.prisma.$disconnect();
  }
}

module.exports = AwinService;
