const IpMacs = require('../models/ipmacs'); // Adjust the path to your model file
const Sources = require('../models/sources'); // Adjust the path to your model file
const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection

// Function to fetch and enrich IPMacs records
async function fetchAndEnrichIpMacs() {
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

  return enrichedIpMacs;
}

// Function to calculate macs data from enrichedIpMacs
function calculateMacsData(enrichedIpMacs) {
  // 1. Calculate total number of devices
  const devicesCount = enrichedIpMacs.length;

  // 2. Count devices with 'eis' true
  const eisCount = enrichedIpMacs.filter((record) => record.eis).length;

  // 3. Count devices with 'dhcp' true
  const dhcpCount = enrichedIpMacs.filter((record) => record.dhcp).length;

  // 4. Count devices by region
  const regionData = enrichedIpMacs.reduce((acc, record) => {
    const { region } = record;
    if (region) {
      acc[region] = (acc[region] || 0) + 1;
    }
    return acc;
  }, {});

  // 5. Count devices by manufacturer
  const manufacturerData = enrichedIpMacs.reduce((acc, record) => {
    const { manufacturer } = record;
    if (manufacturer) {
      acc[manufacturer] = (acc[manufacturer] || 0) + 1;
    }
    return acc;
  }, {});

  // 6. Group manufacturers with less than 15 devices under "Various"
  const groupedManufacturerData = Object.entries(manufacturerData).reduce(
    (acc, [manufacturer, count]) => {
      if (count < 15) {
        // Add to "Various"
        acc['Various'] = (acc['Various'] || 0) + count;
      } else {
        // Keep manufacturers with 15 or more devices
        acc[manufacturer] = count;
      }
      return acc;
    },
    {}
  );

  // 7. Construct the JSON response
  const macTotalData = {
    devices: devicesCount,
    eis: eisCount,
    dhcp: dhcpCount,
    region: regionData,
    manufacturer: devicesCount > 100 ? groupedManufacturerData : manufacturerData
  };

  return macTotalData;
}

// Function to calculate active sites and their breakdown by region
async function getSitesData() {
  try {
    // Step 1: Find all documents where active is true
    const sngplActiveSites = await Sources.find({ active: true });
    const sngplPlannedSites = await Sources.countDocuments();
    const sngplFutureSites = sngplPlannedSites - sngplActiveSites.length;
    const reachableSites = sngplActiveSites.filter((record) => {
        return (!record.reachable && 
            (new Date(record.last_polled_date) >= new Date('2024-08-30')));
      });
    const zeroArpSites = sngplActiveSites.filter((record) => {
        return (
            record.success &&  // Check if success is true
            new Date(record.last_success_date) >= new Date('2024-08-30') &&  // Check if last_success_date is on or after August 30, 2024
            record.arp_count === 0  // Check if arp_count is equal to 0
          );
    });
    
    sites_active = sitesResult(sngplActiveSites);
    
    sites_unreachable = sitesResult(reachableSites);
    sites_neverReached = await Sources.countDocuments({ active: true, last_success_date: null });
    sites_previouslyReached = await Sources.countDocuments({ 
        active: true, 
        last_success_date: { $ne: null },
        reachable: false
    });
    
    sites_arpzero = sitesResult(zeroArpSites);


    return {
        sites_active: {
            ...sites_active,        // Spread properties of sites_active
            sngplPlannedSites,      // Add new key sngplPlannedSites
            sngplFutureSites        // Add new key sngplFutureSites
          },
        sites_unreachable: {
            ...sites_unreachable,
            sites_neverReached,
            sites_previouslyReached
        },
        sites_arpzero
    }

  } catch (error) {
    console.error('Error fetching active sites data:', error);
    throw error;
  }
}


function sitesResult(sngplSites){
    const totalActiveSites = sngplSites.length;
    //console.log(activeSites);
    // Step 3: Calculate the number of active sites by region
    const regionData = sngplSites.reduce((acc, site) => {
      const { region } = site;
      if (region) {
        acc[region] = (acc[region] || 0) + 1;
      }
      return acc;
    }, {});
    const result = {
      sites: {
        active: totalActiveSites,
        region: regionData
      }
    };

    return result;
}
// Function to calculate reachable sites with specific criteria




module.exports = {
  fetchAndEnrichIpMacs,
  calculateMacsData,
  getSitesData,
};
