const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/user');
const router = express.Router();

console.log("I will be adding MFA route");
// Route to set up MFA for a user
router.post('/setup-mfa', async (req, res) => {
    const { username } = req.body;
    console.log(`I will generate qr for ${username}`);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Generate MFA secret
        const secret = speakeasy.generateSecret({ name: 'YourAppName' });

        // Save the secret to the user's account
        user.mfaSecret = secret.base32;
        await user.save();

        // Generate a QR code for Google Authenticator
        qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
            if (err) {
                return res.status(500).send('Error generating QR code');
            }

            // Send QR code to the client
            res.status(200).send(`<img src="${dataUrl}" alt="QR Code" />`);
        });
    } catch (error) {
        res.status(500).send('Error setting up MFA');
    }
});

module.exports = router;