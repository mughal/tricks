// activeDirectoryService.js
const ActiveDirectory = require('activedirectory2');

// Configuration for Active Directory
const config = {
  url: 'ldap://your.ad.domain',
  baseDN: 'dc=yourdomain,dc=com',
  username: 'user@yourdomain.com',
  password: 'password'
};
const ad = new ActiveDirectory(config);

// Function to fetch all devices by type
function fetchDevicesByType(type, callback) {
  const queryOptions = {
    includeDeleted: false,
    attributes: ['cn', 'dn', 'dNSHostName', 'objectCategory', 'operatingSystem', 'ipHostNumber']
  };
  const query = (type === 'printer') ? '(&(objectClass=printer))' : '(&(objectClass=computer)(!(objectClass=printer)))';

  ad.find(query, queryOptions, function(err, results) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return callback(err);
    }
    callback(null, results);
  });
}

module.exports = {
  fetchDevicesByType
};


// main.js
const adService = require('./activeDirectoryService');

// Fetch computers
adService.fetchDevicesByType('computer', (err, computers) => {
  if (err) {
    console.log('Failed to fetch computers:', err);
  } else {
    console.log('Computers:', computers);
  }
});

// Fetch printers
adService.fetchDevicesByType('printer', (err, printers) => {
  if (err) {
    console.log('Failed to fetch printers:', err);
  } else {
    console.log('Printers:', printers);
  }
});


// activeDirectoryService.js
const ActiveDirectory = require('activedirectory2');
const dns = require('dns').promises;  // Node.js DNS module with promise support

const config = {
  url: 'ldap://your.ad.domain',
  baseDN: 'dc=yourdomain,dc=com',
  username: 'user@yourdomain.com',
  password: 'password'
};
const ad = new ActiveDirectory(config);

// Function to fetch all devices by type and resolve their IP addresses
function fetchDevicesByType(type, callback) {
  const queryOptions = {
    includeDeleted: false,
    attributes: ['cn', 'dn', 'dNSHostName', 'objectCategory', 'operatingSystem']
  };
  const query = (type === 'printer') ? '(&(objectClass=printer))' : '(&(objectClass=computer)(!(objectClass=printer)))';

  ad.find(query, queryOptions, async function(err, results) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return callback(err);
    }

    // Resolve DNS hostnames to IPs
    const devicesWithIPs = await Promise.all(results.map(async device => {
      try {
        const ipAddresses = await dns.resolve4(device.dNSHostName);
        return { ...device, ipAddresses };
      } catch (dnsErr) {
        return { ...device, ipAddresses: [], dnsError: dnsErr };
      }
    }));

    callback(null, devicesWithIPs);
  });
}

module.exports = {
  fetchDevicesByType
};

