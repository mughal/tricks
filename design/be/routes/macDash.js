const express = require('express');
const router = express.Router();

// Import the cached dashboard data from the helper file
const { dashboardDataCache } = require('../helpers/dashboardDataHelper'); // Adjust the path as necessary

// Define the route to serve the cached dashboard data
router.get('/dashboard', (req, res) => {
  if (dashboardDataCache.data) {
    res.json({
      status: 'success',
      lastUpdated: dashboardDataCache.lastUpdated,
      data: dashboardDataCache.data
    });
  } else {
    res.status(503).json({
      status: 'error',
      message: 'Data is currently being updated. Please try again shortly.'
    });
  }
});

module.exports = router;
