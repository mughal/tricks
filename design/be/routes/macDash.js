const express = require('express');
const IpMacs = require('../models/ipmacs'); // Adjust the path to your model file
const Sources = require('../models/sources'); // Adjust the path to your model file
const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection

const router = express.Router();

// Endpoint to get mac_dash data
router.get('/mac_dash', async (req, res) => {
  try {
    // Step 1: Fetch all records from ipmacs collection
    const ipMacsRecords = await IpMacs.find({});

    // Step 2: Fetch all MAC addresses in 'eis' and 'dhcprecords' for easy lookup
    const eisMacs = await Eis.distinct('mac');
    const dhcpMacs = await DhcpRecords.distinct('mac');
    const eisSet = new Set(eisMacs); // Use Set for faster lookup
    const dhcpSet = new Set(dhcpMacs); // Use Set for faster lookup

    // Step 3: Enrich each ipmacs record temporarily using the 'source' IP
    const enrichedIpMacs = await Promise.all(
      ipMacsRecords.map(async (record) => {
        const { mac, source } = record;

        // Find the corresponding source document for region and location using the 'source' IP
        const sourceData = await Sources.findOne({ source }); // Match the source IP
        const region = sourceData ? sourceData.region : null;
        const location = sourceData ? sourceData.location : null;

        // Check if MAC is in 'eis' and 'dhcprecords'
        const isEis = eisSet.has(mac);
        const isDhcp = dhcpSet.has(mac);

        return {
          ...record.toObject(), // Convert Mongoose document to plain object
          region,
          location,
          eis: isEis,
          dhcp: isDhcp
        };
      })
    );

    // Construct JSON response with enriched data
    res.json({
      enrichedIpMacs
    });
  } catch (err) {
    console.error('Error fetching mac_dash data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
