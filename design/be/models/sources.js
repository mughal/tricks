const mongoose = require('mongoose');

const sourcesSchema = new mongoose.Schema({
  main_office: { type: String },
  community_string: { type: String },
  genesis: { type: Date },
  last_success_date: { type: Date },
  active: { type: Boolean, default: true },
  device_type: { type: String },
  last_error: { type: String },
  arp_count: { type: Number },
  success: { type: Boolean },
  source: { type: String },
  last_polled_date: { type: Date },
  reachable: { type: Boolean, default: true },
  region: { type: String },
  location: { type: String },
  OID: { type: String },
});

const Sources = mongoose.model('Sources', sourcesSchema);
module.exports = Sources;
