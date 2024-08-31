const mongoose = require('mongoose');

const dhcpRecordsSchema = new mongoose.Schema({
  mac: { type: String },
  dhcpRecords: { type: Array }, // Adjust this to the appropriate type if needed
});

const DhcpRecords = mongoose.model('DhcpRecords', dhcpRecordsSchema);
module.exports = DhcpRecords;
