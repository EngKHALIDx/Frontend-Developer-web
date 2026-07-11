/**
 * Orders API Routes
 * GET /api/orders - List orders with optional status filter
 * GET /api/orders/:id - Get a single order
 * PATCH /api/orders/:id/status - Update order status
 */
const express = require('express');
const router = express.Router();
const { orders } = require('../data/mock-data');

// GET /api/orders - List with optional status filter
router.get('/', async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const { status } = req.query;
    let filtered = [...orders];

    if (status && status !== 'all') {
      filtered = filtered.filter((o) => o.status === status);
    }

    res.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: filtered,
      meta: { page: 1, pageSize: filtered.length, total: filtered.length },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.json({
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
      error: error.message,
    });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { id: order.id, status },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message,
    });
  }
});

module.exports = router;
