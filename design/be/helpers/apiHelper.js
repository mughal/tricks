const Eis = require('../models/eis'); // Model for the 'eis' collection
const DhcpRecords = require('../models/dhcprecords'); // Model for the 'dhcprecords' collection

/**
 * Helper function to get user details from the 'Eis' collection based on MAC address.
 * @param {String} mac - The MAC address to look up.
 * @returns {Object} - The user details in the required JSON format.
 */
async function getUserDetails(mac) {
  const eisRecord = await Eis.findOne({ mac }); // Find the record by MAC address

  if (!eisRecord) return null; // If no record found, return null

  return {
    name: eisRecord.employeeName,
    employeeNumber: eisRecord.userNo,
    department: eisRecord.deptName,
  };
}

/**
 * Helper function to get DHCP details from the 'DhcpRecords' collection based on MAC address.
 * @param {String} mac - The MAC address to look up.
 * @param {Object} ipMacRecord - The IP MAC record containing IPs.
 * @returns {String} - The DHCP name associated with the IPs in the IP MAC record.
 */
async function getDhcpDetails(mac, ipMacRecord) {
  const dhcpRecord = await DhcpRecords.findOne({ mac }); // Find the record by MAC address

  if (!dhcpRecord) return null; // If no record found, return null

  // Get DHCP names from the dhcpSeeker function
  const dhcpNames = dhcpSeeker(ipMacRecord, dhcpRecord);

  // Return DHCP names as a single string or null if empty
  return dhcpNames.length > 0 ? dhcpNames.join(' ') : null;
}

/**
 * Helper function to find matching DHCP names based on IPs.
 * @param {Object} ipMacRecord - The IP MAC record containing IPs.
 * @param {Object} dhcpRecord - The DHCP record containing DHCP entries.
 * @returns {Array} - An array of DHCP names.
 */
function dhcpSeeker(ipMacRecord, dhcpRecord) {
  let dhcpNames = [];

  if (dhcpRecord && ipMacRecord) {
    // Loop through each IP in the ipMacs record
    ipMacRecord.ips.forEach(ip => {
      // Assuming dhcpRecord.dhcpRecords is an array of objects with an 'ip' and 'name'
      dhcpRecord.dhcpRecords.forEach(dhcpEntry => {
        if (dhcpEntry.ip === ip) {
          // If the IP matches, add the name from the DHCP entry to the array
          dhcpNames.push(dhcpEntry.name); // Collect only the names
        }
      });
    });
  }

  return dhcpNames;
}

module.exports = {
  getUserDetails,
  getDhcpDetails,
};
