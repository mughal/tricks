const mongoose = require('mongoose');

const curiozsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  email_verified: { type: Boolean, default: false },
  totp_user: { type: String },
  curiouz_groups: { type: [String] },
  username: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Curiozs = mongoose.model('Curiozs', curiozsSchema);
module.exports = Curiozs;
