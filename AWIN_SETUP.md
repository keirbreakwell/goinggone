# AWIN API Setup Guide

## Step 1: Get Your AWIN Credentials

1. **Sign up for AWIN** at https://www.awin.com/
2. **Get your API Key** from your AWIN dashboard
3. **Find your Feed ID** from the product feeds section

## Step 2: Update Environment Variables

Add these to your `.env` file in the backend directory:

```env
# AWIN API Configuration
AWIN_API_KEY=your_actual_api_key_here
AWIN_FEED_ID=your_actual_feed_id_here
AWIN_API_BASE_URL=https://productdata.awin.com
```

## Step 3: Test the Integration

1. **Start your backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test the product feed:**
   ```bash
   curl http://localhost:3001/api/products/update
   ```

3. **Check the results:**
   ```bash
   curl http://localhost:3001/api/products/stats
   ```

## Step 4: Customize Brand Detection

The system currently looks for these brands in product names:
- Nike, Adidas, Levi, Zara, H&M, Uniqlo, Gap

To add more brands, edit the `extractBrandFromProduct` method in `awinService.js`:

```javascript
const brandKeywords = ['nike', 'adidas', 'levi', 'zara', 'h&m', 'uniqlo', 'gap', 'your_brand_here'];
```

## Step 5: Adjust Discount Threshold

To change the minimum discount percentage, edit `config/awin.js`:

```javascript
minDiscountPercent: 50,  // Change to 30, 40, 60, etc.
```

## Troubleshooting

### Common Issues:

1. **"No popular brands found"**
   - Make sure users have signed up and selected brands
   - Check that brands are being saved to the database

2. **"AWIN feed download error"**
   - Verify your API key and feed ID
   - Check that the feed URL is correct
   - Ensure your AWIN account has access to product feeds

3. **"No products found"**
   - Check that your brand keywords match the products in the feed
   - Verify the discount calculation is working
   - Try lowering the minimum discount threshold

### Debug Mode:

Add this to see detailed logging:
```javascript
// In awinService.js constructor
this.debug = true;
```

## AWIN Data Structure

The system expects AWIN's CSV feed with these columns:
- `aw_product_id` - Unique product ID
- `product_name` - Product name
- `merchant_name` - Retailer name
- `search_price` - Search price
- `store_price` - Store price
- `display_price` - Display price
- `merchant_deep_link` - Product URL
- `merchant_image_url` - Product image
- `category_name` - Product category

## Next Steps

1. Test with a small feed first
2. Monitor the discount statistics
3. Adjust brand detection as needed
4. Fine-tune the discount calculation
5. Add more sophisticated brand matching
