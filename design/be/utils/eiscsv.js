const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// MongoDB connection string (adjust as needed)
const MONGODB_URI = 'mongodb://localhost:27017/your_database_name'; // Replace 'your_database_name' with your actual database name

// Mongoose models (replace with your actual models)
const IpMacs = require('../models/ipmacs');  // Replace with your actual model path
const Eis = require('../models/eis');  // Replace with your actual model path
const DhcpRecords = require('../models/dhcprecords');  // Replace with your actual model path

// Helper function to find matching DHCP names based on IPs
function dhcpSeeker(ipMacRecord, dhcpRecord) {
    let dhcpNames = [];
    if (dhcpRecord && ipMacRecord) {
        ipMacRecord.ips.forEach(ip => {
            dhcpRecord.dhcpRecords.forEach(dhcpEntry => {
                if (dhcpEntry.ip === ip) {
                    dhcpNames.push(dhcpEntry.name);  // Collect only the names
                }
            });
        });
    }
    return dhcpNames;
}

async function generateCsv() {
    try {
        // Connect to MongoDB
       //const Schema = mongoose.Schema;
        mongoose.set("strictQuery",false);
        const mongoDB="mongodb://localhost:27017/ipmacgeniedb";
        // Connect to MongoDB
        mongoose.connect(mongoDB)
        .then(() => console.log('Successfully connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));

        // Fetch data from MongoDB collections
        const ipmacData = await IpMacs.find();
        const eisData = await Eis.find();
        const dhcpData = await DhcpRecords.find();

        // Create maps for easy lookup
        const eisMap = new Map(eisData.map(record => [record.mac, record]));
        const dhcpMap = new Map(dhcpData.map(record => [record.mac, record]));

        // Combine data
        const combinedData = [];
        ipmacData.forEach(ipmac => {
            const mac = ipmac.mac;
            const eisRecord = eisMap.get(mac);
            const dhcpRecord = dhcpMap.get(mac);
            const dhcpNames = dhcpSeeker(ipmac, dhcpRecord);
            const dhcpNamesString = dhcpNames.length > 0 ? dhcpNames.join(' ') : null;

            combinedData.push({
                ipAddress: ipmac.ips[0],  // Assuming single IP for simplicity
                employeeName: eisRecord ? eisRecord.employeeName : null,
                employeeNumber: eisRecord ? eisRecord.userNo : null,
                department: eisRecord ? eisRecord.deptName : null,
                dhcpName: dhcpNamesString
            });
        });

        // Define CSV writer
        const csvWriter = createCsvWriter({
            path: 'ipmac_eis_dhcp_combined.csv',  // Output file name
            header: [
                { id: 'ipAddress', title: 'IP Address' },
                { id: 'employeeName', title: 'Employee Name' },
                { id: 'employeeNumber', title: 'Employee Number' },
                { id: 'department', title: 'Department' },
                { id: 'dhcpName', title: 'DHCP Name' }
            ]
        });

        // Write data to CSV
        await csvWriter.writeRecords(combinedData);
        console.log('CSV file created successfully: ipmac_eis_dhcp_combined.csv');
        
        // Close the MongoDB connection
        mongoose.connection.close();
        console.log('Disconnected from MongoDB.');
    } catch (error) {
        console.error('Error generating CSV:', error);
    }
}

// Run the function
generateCsv();
