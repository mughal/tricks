const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require('../models/user'); // Adjust the path as necessary
mongoose.set("strictQuery",false);
const mongoDB="mongodb://localhost:27017/ipmacgeniedb";
// Connect to MongoDB
mongoose.connect(mongoDB)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


let localuser = "admin";
let localpass = "admin123"

bcrypt.hash(localpass, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    const user = new User({
      username: localuser,
      password: hashedPassword
    });
    const result = await user.save();
  }); 

