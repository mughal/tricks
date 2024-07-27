const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Sample data - In a real-world application, this would come from a database
const networkData = {
    '192.168.1.1': {
        macAddress: '00:1A:2B:3C:4D:5E',
        manufacturer: 'Cisco Systems, Inc.',
        userDetails: 'John Doe',
        lastSeen: '2024-07-26 12:34 PM',
        mainOffice: 'New York',
        subOffice: 'San Francisco',
    },
    // Add more entries as needed
};

// Endpoint to get network details by IP
app.get('/api/network', (req, res) => {
    const ip = req.query.ip;
    if (networkData[ip]) {
        res.json(networkData[ip]);
    } else {
        res.status(404).json({ error: 'IP address not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
