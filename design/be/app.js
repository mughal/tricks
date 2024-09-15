const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require('express-session');
const express = require('express');
const http = require('http'); // Import the http module
const cors = require('cors');
const User = require('./models/user'); // Adjust the path as necessary
const authRoutes = require('./routes/auth'); // Adjust the path as needed
const macTotalRoute = require('./routes/macTotal'); // Import the macTotal route
const authMiddleware = require('./middleware/authMiddleware');
const macDashRoute = require('./routes/macDash'); // Import the macDash route
// const upDateSourceRoute = require('./routes/updateSource'); // Import the macDash route
const { router: updateSourceRouter, setHelpers } = require('./routes/updateSource'); // Import the macDash route
const WebSocket = require('ws');

// Import the helper functions from the helpers file
const { 
    startDashboardDataUpdateInterval, 
    populateDashboardData,
    dashboardDataCache 
  } = require('./helpers/dashboardDataHelper');
  
  // Start the periodic update of dashboard data
startDashboardDataUpdateInterval();

//const Schema = mongoose.Schema;
mongoose.set("strictQuery",false);
const mongoDB="mongodb://localhost:27017/ipmacgeniedb";
// Connect to MongoDB
mongoose.connect(mongoDB)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const app = express();
const port = 3000;
const server = http.createServer(app);

// Function to start the WebSocket server after data is ready
function startWebSocketServer() {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
      console.log('Client connected over ws');

      // Send the current dashboard data to the new client, but only if data is ready
      if (dashboardDataCache.data) {
          ws.send(JSON.stringify({
              status: 'success',
              lastUpdated: dashboardDataCache.lastUpdated,
              data: dashboardDataCache.data
          }));
      } else {
          console.log('Data not ready, not sending initial data to client.');
      }

      // Handle client disconnection
      ws.on('close', () => {
          console.log('Client disconnected');
      });
  });

  // Function to broadcast a message to all connected clients
  function broadcastUpdate(data) {
      wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
          }
      });
  }

  // Call setHelpers to provide the functions to the router
  setHelpers(broadcastUpdate, populateDashboardData);
  
  // Example: Simulate data update broadcast after data update interval
  setInterval(() => {
      if (dashboardDataCache.data) {
          broadcastUpdate({
              status: 'success',
              lastUpdated: dashboardDataCache.lastUpdated,
              data: dashboardDataCache.data
          });

          console.log('Broadcasting updated data');
      } else {
          console.log('Data not ready for broadcasting.');
      }
  }, 30000); // Every 30 seconds (adjust as needed)
}
// Enable CORS for all routes
const networkData = {
    '192.168.1.1': {
        macAddress: '00:1A:2B:3C:4D:5E',
        manufacturer: 'Cisco Systems, Inc.',
        userDetails: 'John Doe',
        lastSeen: '2024-07-26 12:34 PM',
        mainOffice: 'New York',
        subOffice: 'San Francisco',
        source: '10.0.0.1',
    },
    // Add more entries as needed
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.use('/auth', authRoutes);
app.use('/api', macTotalRoute); // All routes in macTotal.js will be prefixed with /api
app.use('/api', macDashRoute);
app.use('/api', updateSourceRouter);
app.get('/api/network', (req, res) => {
    const ip = req.query.ip;
    if (networkData[ip]) {
        res.json({ip, ...networkData[ip]});
    } else {
        res.status(404).json({ error: 'IP address not found' });
    }
});
// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Sample data - In a real-world application, this would come from a database

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

// Start the HTTP server
const PORT = process.env.PORT || 3000; // Non-secure HTTP port
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // Populate initial data
    await populateDashboardData(); // Wait for the data to be populated before starting WS server

    // Start the WebSocket server only after initial data population is complete
    startWebSocketServer();

    // Start the interval for updating the dashboard data
    startDashboardDataUpdateInterval();
});

