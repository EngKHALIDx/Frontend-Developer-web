/**
 * Dashboard API Route
 * GET /api/dashboard - Returns aggregated dashboard statistics
 */
const express = require('express');
const router = express.Router();
const { dashboardStats, revenueData, trafficSources, activityLog } = require('../data/mock-data');

router.get('/', async (req, res) => {
  try {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    res.json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: {
        stats: dashboardStats,
        revenue: revenueData,
        traffic: trafficSources,
        activity: activityLog,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data',
      error: error.message,
    });
  }
});

module.exports = router;
