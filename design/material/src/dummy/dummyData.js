// src/dummyData.js

// Function to generate a random number following a normal distribution
function generateNormalDistribution(mean, stdDev) {
    let u1 = Math.random();
    let u2 = Math.random();
    let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); // Standard normal distributed random number
    return mean + stdDev * randStdNormal; // Random number with given mean and standard deviation
}

// Example normal distribution parameters
const mean = 500;
const stdDev = 200;
export const doughnutChartData = {
    "Area 1": 2197,
    "Area 2": 181,
    "Area 3": 438,
    "Area 4": 145,
    "Area 5": 13,
  };
// Generate normal distribution data for network manufacturers
export const macVendors = {
    "Dell": Math.round(generateNormalDistribution(mean, stdDev)),
    "Cisco": Math.round(generateNormalDistribution(mean, stdDev)),
    "HP": Math.round(generateNormalDistribution(mean, stdDev)),
    "IBM": Math.round(generateNormalDistribution(mean, stdDev)),
    "VMware": Math.round(generateNormalDistribution(mean, stdDev)),
    "Juniper": Math.round(generateNormalDistribution(mean, stdDev)),
    "Netgear": Math.round(generateNormalDistribution(mean, stdDev)),
    "Aruba": Math.round(generateNormalDistribution(mean, stdDev)),
    "Huawei": Math.round(generateNormalDistribution(mean, stdDev)),
    "Nokia": Math.round(generateNormalDistribution(mean, stdDev)),
    "Palo Alto Networks": Math.round(generateNormalDistribution(mean, stdDev)),
    "F5 Networks": Math.round(generateNormalDistribution(mean, stdDev)),
    "Fortinet": Math.round(generateNormalDistribution(mean, stdDev)),
    "Zyxel": Math.round(generateNormalDistribution(mean, stdDev)),
    "Check Point": Math.round(generateNormalDistribution(mean, stdDev)),
    "Ubiquiti": Math.round(generateNormalDistribution(mean, stdDev)),
    "MikroTik": Math.round(generateNormalDistribution(mean, stdDev)),
    "Extreme Networks": Math.round(generateNormalDistribution(mean, stdDev)),
    "Brocade": Math.round(generateNormalDistribution(mean, stdDev)),
    "Riverbed": Math.round(generateNormalDistribution(mean, stdDev))
};

// New object with active site data
export const siteStatusData = {
    active_sites: 100,
    reachable_history: 90,
    reachable_today: 75,
    successful_history: 80,
    successful_today: 60,
    zero_arp: 10
};

export const stackdata = {
    "Lahore-D": { total: 200, visibleToday: 100, appearedToday: 10 },
    "Islamabad": { total: 320, visibleToday: 150, appearedToday: 5 },
    "Rawalpindi": { total: 120, visibleToday: 90, appearedToday: 20 },
    "Peshawar": { total: 132, visibleToday: 50, appearedToday: 20 },
    "Gujranwala": { total: 293, visibleToday: 200, appearedToday: 30 },
    // more sites...
};

export const dualData = {
    "Site 1": { numberOfDevices: 120, secondaryMetric: 50 }, // Network traffic in GB
    "Site 2": { numberOfDevices: 200, secondaryMetric: 120 },
    "Site 3": { numberOfDevices: 150, secondaryMetric: 80 },
    "Site 4": { numberOfDevices: 300, secondaryMetric: 200 },
    "Site 5": { numberOfDevices: 180, secondaryMetric: 90 },
};

export const devices_in_cities = [
    { name: 'Karachi', lat: 24.8607, lng: 67.0011, devices: 150 },
    { name: 'Lahore', lat: 31.5497, lng: 74.3436, devices: 200 },
    { name: 'Islamabad', lat: 33.6844, lng: 73.0479, devices: 100 },
    { name: 'Peshawar', lat: 34.0151, lng: 71.5249, devices: 80 },
    { name: 'Quetta', lat: 30.1798, lng: 66.9750, devices: 60 }
];


const deviceDataByRegion = [
    { region: "North", totalDevices: 150, newDevices: 15 },
    { region: "South", totalDevices: 300, newDevices: 30 },
    { region: "East", totalDevices: 450, newDevices: 45 },
    { region: "West", totalDevices: 100, newDevices: 10 },
  ];

const minTotalDevices = Math.min(...deviceDataByRegion.map(d => d.totalDevices));

export const bubbleChartData = deviceDataByRegion.map((regionData, index) => {
return {
    x: index + 1, // Sequential index for regions on the x-axis
    y: regionData.totalDevices, // Total devices in that region on the y-axis
    r: (regionData.newDevices / minTotalDevices) * 50  // New devices added today determine the bubble size
};
});

export const macTotal = {
    "devices": 7000,
    "cities": {
        "New York": 512,
        "Los Angeles": 361,
        "Chicago": 549,
        "Houston": 392,
        "Phoenix": 470,
        "Philadelphia": 475,
        "San Antonio": 335,
        "San Diego": 322,
        "Dallas": 499,
        "San Jose": 420,
        "Austin": 304,
        "Jacksonville": 385,
        "Fort Worth": 467,
        "Columbus": 359,
        "San Francisco": 483,
        "Charlotte": 370,
        "Indianapolis": 437,
        "Seattle": 487,
        "Denver": 400,
        "Washington": 474
    },
    "manufacture": {
        "Intel": 155,
        "Broadcom": 108,
        "Qualcomm": 148,
        "Realtek": 132,
        "Cisco": 163,
        "Juniper": 152,
        "Arista": 129,
        "Netgear": 130,
        "TP-Link": 145,
        "Ubiquiti": 152,
        "MikroTik": 154,
        "Linksys": 144,
        "Zyxel": 150,
        "D-Link": 136,
        "TRENDnet": 144,
        "HP": 154,
        "Dell": 132,
        "IBM": 140,
        "Fujitsu": 136,
        "Huawei": 135,
        "Alcatel-Lucent": 136,
        "Ericsson": 151,
        "Nokia": 145,
        "Sony": 140,
        "Samsung": 138,
        "Xiaomi": 140,
        "LG": 145,
        "Motorola": 134,
        "NVIDIA": 132,
        "AMD": 134,
        "Asus": 131,
        "MSI": 135,
        "Gigabyte": 138,
        "Supermicro": 138,
        "Toshiba": 131,
        "Panasonic": 137,
        "Hitachi": 136,
        "NEC": 132,
        "Lenovo": 133,
        "Sharp": 137,
        "Apple": 132,
        "Google": 130,
        "Microsoft": 142,
        "Amazon": 131,
        "Oracle": 131,
        "VMware": 144,
        "Fortinet": 134,
        "Check Point": 138,
        "Palo Alto Networks": 131,
        "F5 Networks": 137
    }
};

export const macToday = {
    "devices": 5329,
    "cities": {
        "New York": 305,
        "Los Angeles": 286,
        "Chicago": 297,
        "Houston": 258,
        "Phoenix": 292,
        "Philadelphia": 273,
        "San Antonio": 241,
        "San Diego": 260,
        "Dallas": 248,
        "San Jose": 244,
        "Austin": 271,
        "Jacksonville": 238,
        "Fort Worth": 269,
        "Columbus": 264,
        "San Francisco": 264,
        "Charlotte": 261,
        "Indianapolis": 238,
        "Seattle": 270,
        "Denver": 271,
        "Washington": 279
    },
    "manufacture": {
        "Intel": 102,
        "Broadcom": 95,
        "Qualcomm": 95,
        "Realtek": 113,
        "Cisco": 111,
        "Juniper": 109,
        "Arista": 108,
        "Netgear": 102,
        "TP-Link": 104,
        "Ubiquiti": 99,
        "MikroTik": 111,
        "Linksys": 99,
        "Zyxel": 109,
        "D-Link": 110,
        "TRENDnet": 98,
        "HP": 109,
        "Dell": 100,
        "IBM": 98,
        "Fujitsu": 111,
        "Huawei": 102,
        "Alcatel-Lucent": 102,
        "Ericsson": 103,
        "Nokia": 104,
        "Sony": 99,
        "Samsung": 108,
        "Xiaomi": 99,
        "LG": 106,
        "Motorola": 101,
        "NVIDIA": 106,
        "AMD": 97,
        "Asus": 102,
        "MSI": 109,
        "Gigabyte": 101,
        "Supermicro": 106,
        "Toshiba": 95,
        "Panasonic": 96,
        "Hitachi": 108,
        "NEC": 103,
        "Lenovo": 100,
        "Sharp": 99,
        "Apple": 108,
        "Google": 102,
        "Microsoft": 97,
        "Amazon": 96,
        "Oracle": 99,
        "VMware": 99,
        "Fortinet": 96,
        "Check Point": 108,
        "Palo Alto Networks": 102,
        "F5 Networks": 97
    }
}

export const macNew = {
    "devices": 39,
    "cities": {
        "New York": 4,
        "Los Angeles": 5,
        "Chicago": 2,
        "Houston": 7,
        "Phoenix": 0,
        "Philadelphia": 2,
        "San Antonio": 4,
        "San Diego": 0,
        "Dallas": 5,
        "San Jose": 0,
        "Austin": 2,
        "Jacksonville": 0,
        "Fort Worth": 3,
        "Columbus": 0,
        "San Francisco": 0,
        "Charlotte": 0,
        "Indianapolis": 1,
        "Seattle": 1,
        "Denver": 3,
        "Washington": 0
    },
    "manufacture": {
        "Intel": 3,
        "Broadcom": 2,
        "Qualcomm": 0,
        "Realtek": 2,
        "Cisco": 0,
        "Juniper": 1,
        "Arista": 3,
        "Netgear": 0,
        "TP-Link": 4,
        "Ubiquiti": 0,
        "MikroTik": 1,
        "Linksys": 0,
        "Zyxel": 2,
        "D-Link": 0,
        "TRENDnet": 1,
        "HP": 2,
        "Dell": 1,
        "IBM": 3,
        "Fujitsu": 2,
        "Huawei": 2,
        "Alcatel-Lucent": 1,
        "Ericsson": 0,
        "Nokia": 2,
        "Sony": 1,
        "Samsung": 2,
        "Xiaomi": 0,
        "LG": 0,
        "Motorola": 0,
        "NVIDIA": 1,
        "AMD": 0,
        "Asus": 1,
        "MSI": 0,
        "Gigabyte": 2,
        "Supermicro": 0,
        "Toshiba": 0,
        "Panasonic": 0,
        "Hitachi": 1,
        "NEC": 2,
        "Lenovo": 0,
        "Sharp": 1,
        "Apple": 0,
        "Google": 0,
        "Microsoft": 2,
        "Amazon": 0,
        "Oracle": 1,
        "VMware": 0,
        "Fortinet": 0,
        "Check Point": 2,
        "Palo Alto Networks": 0,
        "F5 Networks": 0
    }
}


export const sitesActive = {
    "sites": 244,
    "cities": {
        "New York": 17,
        "Los Angeles": 18,
        "Chicago": 16,
        "Houston": 19,
        "Phoenix": 16,
        "Philadelphia": 14,
        "San Antonio": 13,
        "San Diego": 12,
        "Dallas": 15,
        "San Jose": 13,
        "Austin": 9,
        "Jacksonville": 10,
        "Fort Worth": 11,
        "Columbus": 8,
        "San Francisco": 9,
        "Charlotte": 7,
        "Indianapolis": 6,
        "Seattle": 9,
        "Denver": 8,
        "Washington": 9
    }
};

export const sitesUnreachable = {
    "sites": 103,
    "cities": {
        "New York": 9,
        "Los Angeles": 10,
        "Chicago": 8,
        "Houston": 10,
        "Phoenix": 9,
        "Philadelphia": 6,
        "San Antonio": 6,
        "San Diego": 5,
        "Dallas": 7,
        "San Jose": 6,
        "Austin": 4,
        "Jacksonville": 4,
        "Fort Worth": 3,
        "Columbus": 4,
        "San Francisco": 3,
        "Charlotte": 3,
        "Indianapolis": 3,
        "Seattle": 4,
        "Denver": 5,
        "Washington": 4
    }
};

export const sitesZeroDevices = {
    "sites": 33,
    "cities": {
        "New York": 4,
        "Los Angeles": 3,
        "Chicago": 0,
        "Houston": 4,
        "Phoenix": 2,
        "Philadelphia": 0,
        "San Antonio": 2,
        "San Diego": 2,
        "Dallas": 3,
        "San Jose": 0,
        "Austin": 0,
        "Jacksonville": 2,
        "Fort Worth": 0,
        "Columbus": 0,
        "San Francisco": 1,
        "Charlotte": 0,
        "Indianapolis": 1,
        "Seattle": 1,
        "Denver": 3,
        "Washington": 1
    }
};


export const mac_total = {
    "devices": 7000,
    "eis": 732,
    "dhcp": 432,
    "region": {
        "New York": 512,
        "Los Angeles": 361,
        "Chicago": 549,
        "Houston": 392,
        "Phoenix": 470,
        "Philadelphia": 475,
        "San Antonio": 335,
        "San Diego": 322,
        "Dallas": 499,
        "San Jose": 420,
        "Austin": 304,
        "Jacksonville": 385,
        "Fort Worth": 467,
        "Columbus": 359,
        "San Francisco": 483,
        "Charlotte": 370,
        "Indianapolis": 437,
        "Seattle": 487,
        "Denver": 400,
        "Washington": 474
    },
    "manufacturer": {
        "Intel": 155,
        "Broadcom": 108,
        "Qualcomm": 148,
        "Realtek": 132,
        "Cisco": 163,
        "Juniper": 152,
        "Arista": 129,
        "Netgear": 130,
        "TP-Link": 145,
        "Ubiquiti": 152,
        "MikroTik": 154,
        "Linksys": 144,
        "Zyxel": 150,
        "D-Link": 136,
        "TRENDnet": 144,
        "HP": 154,
        "Dell": 132,
        "IBM": 140,
        "Fujitsu": 136,
        "Huawei": 135,
        "Alcatel-Lucent": 136,
        "Ericsson": 151,
        "Nokia": 145,
        "Sony": 140,
        "Samsung": 138,
        "Xiaomi": 140,
        "LG": 145,
        "Motorola": 134,
        "NVIDIA": 132,
        "AMD": 134,
        "Asus": 131,
        "MSI": 135,
        "Gigabyte": 138,
        "Supermicro": 138,
        "Toshiba": 131,
        "Panasonic": 137,
        "Hitachi": 136,
        "NEC": 132,
        "Lenovo": 133,
        "Sharp": 137,
        "Apple": 132,
        "Google": 130,
        "Microsoft": 142,
        "Amazon": 131,
        "Oracle": 131,
        "VMware": 144,
        "Fortinet": 134,
        "Check Point": 138,
        "Palo Alto Networks": 131,
        "F5 Networks": 137
    }
};
