const express = require('express');
const IpMacs = require('../models/ipmacs'); // Adjust the path to your model file
const Sources = require('../models/sources'); // Adjust the path to your model file
const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection
const { fetchAndEnrichIpMacs, calculateMacsData } = require('../utils/helpers'); 

const router = express.Router();

// Endpoint to get mac_dash data
router.get('/mac_total', async (req, res) => {
  try {
    const enrichedIpMacs = await fetchAndEnrichIpMacs();
    const macs_total = calculateMacsData(enrichedIpMacs);
    // Step 2: Filter records where last_seen >= 2024-08-30
    const filteredIpMacsToday = enrichedIpMacs.filter((record) => {
        return new Date(record.last_seen) >= new Date('2024-08-30');
      });
    const macs_today = calculateMacsData(filteredIpMacsToday);
    
    const filteredIpMacsNew = enrichedIpMacs.filter((record) => {
        return new Date(record.genesis_date) >= new Date('2024-08-30');
      });
   
    const macs_new = calculateMacsData(filteredIpMacsNew);
    macTotalData = {macs_total, macs_today, macs_new};
    // Send the constructed JSON response
    res.json(macTotalData);
  } catch (err) {
    console.error('Error fetching mac_dash data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
