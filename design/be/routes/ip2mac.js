const IpMacs = require('../models/ipmacs');
const IpMacHistories = require('../models/ipmachistories');
const Sources = require('../models/sources'); // Import Sources model
const { getUserDetails, getDhcpDetails } = require('../helpers/apiHelper'); // Import helper functions
const express = require('express');
const router = express.Router();

// Define API Endpoint
router.get('/ip/:ipAddress', async (req, res) => {
  try {
    const ipAddress = req.params.ipAddress;

    // Fetch MAC details for the given IP from the present data collection
    const ipMacData = await IpMacs.findOne({ ips: ipAddress });

    if (!ipMacData) {
      return res.status(404).json({ message: `IP ${ipAddress} not found in IpMacs collection` });
    }

    const macAddress = ipMacData.mac;
    const currentSource = ipMacData.source; // Fetch current source

    // Fetch history for the MAC address from the historical data collection
    const ipHistoryData = await IpMacHistories.find({ ips: ipAddress });

    // Determine if we need to include history data
    let macDetails = [];

    if (ipHistoryData.length > 0) {
      const uniqueMacs = new Set(ipHistoryData.map(history => history.mac));
      if (uniqueMacs.size > 1) {
        // Multiple MACs found in history, combine present data with historical data
        macDetails = [
          {
            macAddress: macAddress,
            history: [
              {
                firstSeen: ipMacData.genesis_date ? ipMacData.genesis_date.toISOString().split('T')[0] : null,
                lastSeen: ipMacData.last_seen ? ipMacData.last_seen.toISOString().split('T')[0] : null,
              },
              ...ipHistoryData.map(history => ({
                firstSeen: history.genesis_date ? history.genesis_date.toISOString().split('T')[0] : null,
                lastSeen: history.last_seen ? history.last_seen.toISOString().split('T')[0] : null,
              })),
            ],
          },
        ];
      } else {
        // Only one unique MAC address is involved, use only current data
        macDetails = [
          {
            macAddress: macAddress,
            history: [
              {
                firstSeen: ipMacData.genesis_date ? ipMacData.genesis_date.toISOString().split('T')[0] : null,
                lastSeen: ipMacData.last_seen ? ipMacData.last_seen.toISOString().split('T')[0] : null,
              },
            ],
          },
        ];
      }
    } else {
      // No history, use only current data
      macDetails = [
        {
          macAddress: macAddress,
          history: [
            {
              firstSeen: ipMacData.genesis_date ? ipMacData.genesis_date.toISOString().split('T')[0] : null,
              lastSeen: ipMacData.last_seen ? ipMacData.last_seen.toISOString().split('T')[0] : null,
            },
          ],
        },
      ];
    }

    // Fetch source details for the current source
    const sourceData = await Sources.findOne({ source: currentSource });

    // Construct source object using the source's IP, region, and location from `Sources`
    const sourceDetails = {
      ip: sourceData ? sourceData.source : null, // Use `source` from `Sources` as IP
      location: sourceData ? sourceData.location : null,
      region: sourceData ? sourceData.region : null,
    };

    // Fetch user and DHCP details
    const userDetails = await getUserDetails(macAddress);
    const dhcpName = await getDhcpDetails(macAddress, ipMacData);

    // Construct the final JSON response
    const response = {
      ipAddress: ipAddress,
      macDetails: macDetails.map(detail => ({
        ...detail,
        source: sourceDetails,
        user: userDetails || { name: null, employeeNumber: null, department: null }, // Fallback if user not found
        pc: {
          pcName: "PC20345", // Placeholder for PC Name from AD
          operatingSystem: "Windows 10", // Placeholder for OS from AD
          dhcpName: dhcpName,
        },
      })),
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching IP to MAC mapping:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
