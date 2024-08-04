const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const express = require('express');
const cors = require('cors');

const Schema = mongoose.Schema;
mongoose.set("strictQuery",false);
const mongoDB="mongodb://localhost:27017/localauth";
// Connect to MongoDB
mongoose.connect(mongoDB)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
//   console.log('Successfully connected to MongoDB');
// }
const User = mongoose.model(
  "User",
  new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
  })
);

// let localuser = "admin";
// let localpass = "admin123"

// bcrypt.hash(localpass, 10, async (err, hashedPassword) => {
//     // if err, do something
//     // otherwise, store hashedPassword in DB
//     const user = new User({
//       username: localuser,
//       password: hashedPassword
//     });
//     const result = await user.save();
//   }); 

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
        source: '10.0.0.1',
    },
    // Add more entries as needed
};

// Endpoint to get network details by IP
app.get('/api/network', (req, res) => {
    const ip = req.query.ip;
    if (networkData[ip]) {
        res.json({ip, ...networkData[ip]});
    } else {
        res.status(404).json({ error: 'IP address not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



