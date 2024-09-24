// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user'); // Adjust the path as needed

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(`${username} tryying to login`);
//     try {
//         const user = await User.findOne({ username });
//         if (user && await bcrypt.compare(password, user.password)) {
//             // Here, you would normally set the user session
//             console.log(`${user} logged in`);
//             req.session.userId = user._id;
//             console.log(`setting session ${req.session.userId} `)
//             res.status(200).send('Login successful');
//         } else {
//             res.status(400).send('Invalid credentials');
//         }
//     } catch (error) {
//         res.status(500).send('Error logging in');
//     }
// });

const express = require('express');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const User = require('../models/user');

const router = express.Router();
console.log("This is auth route");
// Login route
router.post('/login', async (req, res) => {
    const { username, password, mfaCode } = req.body; // MFA code will be part of the login request
    console.log(`Received request to authenticate ${username} with MFA code: ${mfaCode}`);

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`Received request to authenticate ${username} with ${mfacodes} for ${user}`);
            return res.status(400).send('Invalid username or password');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password');
        }

        // Check if MFA is enabled for this user
        if (user.mfaEnabled) {
            if (!mfaCode) {
                return res.status(400).send('MFA code required');
            }

            // Verify MFA code
            const isMfaValid = speakeasy.totp.verify({
                secret: user.mfaSecret,
                encoding: 'base32',
                token: mfaCode
            });

            if (!isMfaValid) {
                return res.status(400).send('Invalid MFA code');
            }
        }

        // Successful login, set session or token
        req.session.userId = user._id;
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;

// module.exports = router;
