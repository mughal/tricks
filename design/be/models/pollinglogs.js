const mongoose = require('mongoose');

const pollingLogsSchema = new mongoose.Schema({
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  mode: { type: String },
  details: { type: String },
});

const PollingLogs = mongoose.model('PollingLogs', pollingLogsSchema);
module.exports = PollingLogs;
