const data = {
    "sourceDetails": {
      "ip": "192.168.0.1",
      "location": "Harbancpura",
      "region": "Lahore-D"
    },
    "macDetails": {
      "macAddress": "192.168.1.100",
      "history": [
        { "firstSeen": "July 10, 2024", "lastSeen": "August 10, 2024" },
        { "firstSeen": "July 10, 2024", "lastSeen": "August 10, 2024" },
        { "firstSeen": "July 10, 2024", "lastSeen": "August 10, 2024" }
      ]
    },
    "userDetails": {
      "name": "John Doe",
      "employeeNumber": "11223344",
      "department": "Marketing"
    },
    "pcDetails": {
      "pcName": "PC20345",
      "operatingSystem": "Windows 10",
      "dhcpName": "DHCP Name"
    }
  };
  
  // Example usage:
  document.body.appendChild(getCard(data));
  