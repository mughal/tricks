const express = require('express');
const bcrypt = require('bcryptjs');
const Sources = require('../models/sources'); // Adjust the path as needed

const router = express.Router();

// GET endpoint to fetch source information by IP
router.get('/source', async (req, res) => {
    const { source_ip } = req.query; // Get source_ip from query parameter
    try {
      // Find the source record by source_ip
      console.log("checking io",source_ip);
      const source = await Sources.findOne({ source: source_ip });
      if (!source) {
        return res.status(404).json({ message: 'Source not found' });
      }
      res.json(source);
    } catch (error) {
      console.error('Error fetching source:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// POST endpoint to update source information by IP
router.post('/source', async (req, res) => {
  const { source_ip, main_office, community_string, region, location, OID, active } = req.body; // Extract data from the request body
  console.log(req.body);
  try {
      // Validate required fields
      if (!source_ip) {
          return res.status(400).json({ message: 'source_ip is required' });
      }

      // Find the source record by source_ip and update it
      const source = await Sources.findOneAndUpdate(
          { source: source_ip },
          { main_office, community_string, region, location, OID, active },
          { new: true, runValidators: true } // Return the updated document and run validators
      );

      if (!source) {
          return res.status(404).json({ message: 'Source not found' });
      }

      res.json({ message: 'Source updated successfully', source });
  } catch (error) {
      console.error('Error updating source:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
