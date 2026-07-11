/**
 * Users API Routes
 * GET /api/users - List all users
 * GET /api/users/:id - Get a single user
 */
const express = require('express');
const router = express.Router();
const { users } = require('../data/mock-data');

router.get('/', async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      meta: { page: 1, pageSize: users.length, total: users.length },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
});

module.exports = router;
