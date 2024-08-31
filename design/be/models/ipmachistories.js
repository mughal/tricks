const mongoose = require('mongoose');

const ipmacHistoriesSchema = new mongoose.Schema({
  manufacturer: { type: String },
  source: { type: String },
  genesis_date: { type: Date },
  ips: { type: [String] },
  mac: { type: String },
  main_office: { type: String },
  last_seen: { type: Date },
  date: { type: Date },
});

const IpMacHistories = mongoose.model('IpMacHistories', ipmacHistoriesSchema);
module.exports = IpMacHistories;
