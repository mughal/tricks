const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    mfaEnabled: { type: Boolean, default: false }, // MFA enabled flag
    mfaSecret: { type: String } // Secret for MFA
});

const User = mongoose.model('User', userSchema);

module.exports = User;
