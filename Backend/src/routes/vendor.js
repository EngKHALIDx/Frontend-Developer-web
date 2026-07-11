/**
 * Vendor API Route
 * GET /api/vendor - Returns vendor portal data (stats, products, pending orders)
 */
const express = require('express');
const router = express.Router();
const { vendorStats, vendorProducts, orders } = require('../data/mock-data');

router.get('/', async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pendingOrders = orders.filter(
      (o) => o.status === 'pending' || o.status === 'processing'
    );

    res.json({
      success: true,
      message: 'Vendor data retrieved successfully',
      data: {
        stats: vendorStats,
        products: vendorProducts,
        pendingOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vendor data',
      error: error.message,
    });
  }
});

module.exports = router;
