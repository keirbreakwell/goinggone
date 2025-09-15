// AWIN Service Configuration
module.exports = {
  // Data Management
  maxProductsPerBrand: 50,        // Maximum products to fetch per brand
  maxBrandsToFetch: 10,           // Maximum number of brands to fetch
  minUpdateInterval: 5 * 60 * 1000, // 5 minutes minimum between updates
  
  // Discount Filtering
  minDiscountPercent: 50,         // Only fetch products with 50%+ discount
  
  // API Configuration
  apiBaseUrl: 'https://api.awin.com',
  rateLimitDelay: 100,            // Delay between API calls (ms)
  
  // Database Configuration
  maxRetries: 3,                  // Maximum retries for failed operations
  batchSize: 100,                 // Batch size for database operations
};
