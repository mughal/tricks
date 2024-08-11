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
  