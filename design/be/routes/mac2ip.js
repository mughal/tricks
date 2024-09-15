const IpMacs = require('../models/ipmacs');
const IpMacHistories = require('../models/ipmachistories');
const Sources = require('../models/sources'); // Import Sources model
const { getUserDetails, getDhcpDetails } = require('../helpers/apiHelper'); // Import helper functions
const express = require('express');
const router = express.Router();

// Define API Endpoint
router.get('/mac/:macAddress', async (req, res) => {
  try {
    const macAddress = req.params.macAddress;

    // Fetch IP details for the given MAC from the present data collection
    const ipMacData = await IpMacs.find({ mac: macAddress });

    // Fetch historical IP details for the given MAC
    const ipHistoryData = await IpMacHistories.find({ mac: macAddress });

    // Create a map to store records against MAC addresses
    const macRecordsMap = new Map();

    // Helper function to add records to the map
    const addRecordToMap = async (mac, record) => {
      if (!macRecordsMap.has(mac)) {
        macRecordsMap.set(mac, []);
      }
      macRecordsMap.get(mac).push(record);
    };

    // Add current records to the map
    await Promise.all(ipMacData.map(record => addRecordToMap(macAddress, record)));

    // Add historical records to the map
    await Promise.all(ipHistoryData.map(record => addRecordToMap(macAddress, record)));

    // Now process the map to build the response
    const macRecords = macRecordsMap.get(macAddress) || [];
    const ipDetailsMap = new Map();  // Map to store aggregated IP details

    // Helper function to aggregate dates
    const aggregateDates = (existingRecord, newRecord) => {
      const existingFirstSeen = existingRecord.firstSeen ? new Date(existingRecord.firstSeen) : null;
      const newFirstSeen = newRecord.genesis_date ? new Date(newRecord.genesis_date) : null;
      const existingLastSeen = existingRecord.lastSeen ? new Date(existingRecord.lastSeen) : null;
      const newLastSeen = newRecord.last_seen ? new Date(newRecord.last_seen) : null;

      return {
        firstSeen: (!existingFirstSeen || (newFirstSeen && newFirstSeen < existingFirstSeen)) ? newFirstSeen : existingFirstSeen,
        lastSeen: (!existingLastSeen || (newLastSeen && newLastSeen > existingLastSeen)) ? newLastSeen : existingLastSeen
      };
    };

    // Process each record for aggregation
    for (const record of macRecords) {
      const currentSource = record.source;

      // Fetch source details
      const sourceData = await Sources.findOne({ source: currentSource });
      const sourceDetails = {
        ip: sourceData ? sourceData.source : null,
        location: sourceData ? sourceData.location : null,
        region: sourceData ? sourceData.region : null,
      };

      // Fetch user and DHCP details
      const userDetails = await getUserDetails(macAddress);
      const dhcpName = await getDhcpDetails(macAddress, record);

      // Iterate over all IPs in the record and aggregate firstSeen and lastSeen
      record.ips.forEach(ipAddress => {
        if (!ipDetailsMap.has(ipAddress)) {
          ipDetailsMap.set(ipAddress, {
            ipAddress: ipAddress,
            source: sourceDetails,
            firstSeen: record.genesis_date ? record.genesis_date.toISOString().split('T')[0] : null,
            lastSeen: record.last_seen ? record.last_seen.toISOString().split('T')[0] : null,
            user: userDetails || { name: null, employeeNumber: null, department: null },
            pc: {
              pcName: "PC20345", // Placeholder for PC Name from AD
              operatingSystem: "Windows 10", // Placeholder for OS from AD
              dhcpName: dhcpName,
            }
          });
        } else {
          // Aggregate dates for existing IP details
          const existingDetails = ipDetailsMap.get(ipAddress);
          const aggregatedDates = aggregateDates(existingDetails, record);
          ipDetailsMap.set(ipAddress, {
            ...existingDetails,
            firstSeen: aggregatedDates.firstSeen ? aggregatedDates.firstSeen.toISOString().split('T')[0] : null,
            lastSeen: aggregatedDates.lastSeen ? aggregatedDates.lastSeen.toISOString().split('T')[0] : null,
          });
        }
      });
    }

    // Convert the map to an array of IP details
    const ipDetails = Array.from(ipDetailsMap.values());

    // Construct the final JSON response
    const response = {
      macAddress: macAddress,
      ipDetails: ipDetails,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching MAC to IP mapping:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
