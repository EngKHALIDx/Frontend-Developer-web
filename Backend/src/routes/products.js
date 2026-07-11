/**
 * Products API Routes
 * GET /api/products - List products with optional filtering
 * GET /api/products/:id - Get a single product
 * POST /api/products - Create a new product
 * PUT /api/products/:id - Update a product
 * DELETE /api/products/:id - Delete a product
 */
const express = require('express');
const router = express.Router();
const { products } = require('../data/mock-data');

// GET /api/products - List with filtering and pagination
router.get('/', async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const { category, search, page = 1, pageSize = 20 } = req.query;
    let filtered = [...products];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Search by name, description, or tags
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Pagination
    const total = filtered.length;
    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);
    const start = (pageNum - 1) * pageSizeNum;
    const paginated = filtered.slice(start, start + pageSizeNum);

    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: paginated,
      meta: { page: pageNum, pageSize: pageSizeNum, total },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message,
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
      error: error.message,
    });
  }
});

// POST /api/products - Create product
router.post('/', async (req, res) => {
  try {
    const newProduct = {
      id: `p${Date.now()}`,
      ...req.body,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    // In production: save to database
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message,
    });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    const updated = { ...product, ...req.body, id: req.params.id };
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message,
    });
  }
});

module.exports = router;
