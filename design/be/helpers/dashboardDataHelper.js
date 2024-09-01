const IpMacs = require('../models/ipmacs'); // Adjust the path to your model file
const Sources = require('../models/sources'); // Adjust the path to your model file
const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection
const {
    fetchAndEnrichIpMacs,
    calculateMacsData,
    getSitesData,
} = require('../utils/helpers'); 

// This file is in the helpers folder

// In-memory cache for dashboard data
let dashboardDataCache = {
    lastUpdated: null, // To keep track of when the data was last updated
    data: null         // This will hold the actual dashboard data
  };
  
  // Function to populate the dashboard data
  async function populateDashboardData() {
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
      
    
        combinedData = {
            ...sngpl_sites,
            macs_total,
            macs_today,
            macs_new
        };
  
      // Update cache
      dashboardDataCache.data = combinedData;
      dashboardDataCache.lastUpdated = new Date();
  
      console.log('Dashboard data updated in cache at:', dashboardDataCache.lastUpdated);
    } catch (error) {
      console.error('Error updating dashboard data:', error);
    }
  }
  
  // Function to periodically update the dashboard data every 10 minutes
  function startDashboardDataUpdateInterval() {
    setInterval(populateDashboardData, 10 * 60 * 1000);  // 10 minutes in milliseconds
    populateDashboardData(); // Initial population of data
  }
  
  // Export the functions and cache object
  module.exports = {
    populateDashboardData,
    startDashboardDataUpdateInterval,
    dashboardDataCache
  };
  