const express = require('express');
const IpMacs = require('../models/ipmacs'); // Adjust the path to your model file
const Sources = require('../models/sources'); // Adjust the path to your model file
const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection
const {
    fetchAndEnrichIpMacs,
    calculateMacsData,
    getSitesData,
    fetchIpMacs,
} = require('../utils/helpers'); 

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
    const sngpl_sites = await getSitesData();
  

    dashBoardData = {
        ...sngpl_sites,
        macs_total,
        macs_today,
        macs_new
    };
    // Send the constructed JSON response
    res.json(dashBoardData);
  } catch (err) {
    console.error('Error fetching mac_dash data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new endpoint in the same router
router.get('/fetch-ip-macs', async (req, res) => {
    try {
        // Logic to fetch IP MACs, assuming fetchIpMacs() is your function
        const data = await fetchIpMacs(); // You need to define or import this function
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
