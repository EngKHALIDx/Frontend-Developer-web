/**
 * MonoVerse Backend API Server
 * Express.js REST API server for the MonoVerse platform.
 *
 * Endpoints:
 *   GET  /api/dashboard    - Dashboard statistics
 *   GET  /api/products     - Product catalog (with filtering)
 *   GET  /api/products/:id - Single product
 *   POST /api/products     - Create product
 *   PUT  /api/products/:id - Update product
 *   DELETE /api/products/:id - Delete product
 *   GET  /api/orders       - Order list (with status filter)
 *   GET  /api/orders/:id   - Single order
 *   PATCH /api/orders/:id/status - Update order status
 *   GET  /api/users        - User list
 *   GET  /api/users/:id    - Single user
 *   GET  /api/vendor       - Vendor portal data
 *   GET  /api/customer     - Customer portal data
 *
 * Run: node src/server.js
 * Default port: 3001
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ===== Middleware =====
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ===== Static Files (Screenshots) =====
app.use('/screenshots', express.static(
  path.join(__dirname, '../../Frontend Developer/public/screenshots')
));

// ===== API Routes =====
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/vendor', require('./routes/vendor'));
app.use('/api/customer', require('./routes/customer'));

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'MonoVerse API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ===== API Info =====
app.get('/', (req, res) => {
  res.json({
    name: 'MonoVerse Backend API',
    version: '1.0.0',
    description: 'REST API server for the MonoVerse e-commerce platform',
    endpoints: {
      dashboard: 'GET /api/dashboard',
      products: 'GET /api/products, GET /api/products/:id, POST /api/products, PUT /api/products/:id, DELETE /api/products/:id',
      orders: 'GET /api/orders, GET /api/orders/:id, PATCH /api/orders/:id/status',
      users: 'GET /api/users, GET /api/users/:id',
      vendor: 'GET /api/vendor',
      customer: 'GET /api/customer',
    },
    health: 'GET /health',
  });
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     MonoVerse Backend API Server           ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running at:    http://localhost:${PORT}`);
  console.log(`📊 Dashboard API:        http://localhost:${PORT}/api/dashboard`);
  console.log(`🛒 Products API:         http://localhost:${PORT}/api/products`);
  console.log(`📦 Orders API:           http://localhost:${PORT}/api/orders`);
  console.log(`👥 Users API:            http://localhost:${PORT}/api/users`);
  console.log(`🏪 Vendor API:           http://localhost:${PORT}/api/vendor`);
  console.log(`👤 Customer API:         http://localhost:${PORT}/api/customer`);
  console.log(`❤️  Health Check:         http://localhost:${PORT}/health`);
  console.log('');
  console.log(`Press Ctrl+C to stop the server`);
  console.log('');
});
