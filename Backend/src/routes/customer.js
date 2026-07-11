/**
 * Customer API Route
 * GET /api/customer - Returns customer portal data (profile, order history)
 */
const express = require('express');
const router = express.Router();
const { customerProfile, customerOrders } = require('../data/mock-data');

router.get('/', async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    res.json({
      success: true,
      message: 'Customer data retrieved successfully',
      data: {
        profile: customerProfile,
        orders: customerOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve customer data',
      error: error.message,
    });
  }
});

module.exports = router;
