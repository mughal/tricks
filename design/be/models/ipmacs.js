const mongoose = require('mongoose');

const ipmacsSchema = new mongoose.Schema({
  manufacturer: { type: String },
  source: { type: String },
  ips: { type: [String] },
  genesis_date: { type: Date },
  mac: { type: String },
  last_seen: { type: Date },
  main_office: { type: String },
  counter: { type: Number },
});

const IpMacs = mongoose.model('IpMacs', ipmacsSchema);
module.exports = IpMacs;
