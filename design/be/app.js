const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const User = require('./models/user'); // Adjust the path as necessary
const authRoutes = require('./routes/auth'); // Adjust the path as needed
const macTotalRoute = require('./routes/macTotal'); // Import the macTotal route
const authMiddleware = require('./middleware/authMiddleware');
const macDashRoute = require('./routes/macDash'); // Import the macDash route
const upDateSourceRoute = require('./routes/updateSource'); // Import the macDash route

// Import the helper functions from the helpers file
const { 
    startDashboardDataUpdateInterval, 
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


// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.use('/auth', authRoutes);
app.use('/api', macTotalRoute); // All routes in macTotal.js will be prefixed with /api
app.use('/api', macDashRoute);
app.use('/api', upDateSourceRoute);
// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Sample data - In a real-world application, this would come from a database

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



