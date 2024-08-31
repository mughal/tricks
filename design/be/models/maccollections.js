const mongoose = require('mongoose');

const macCollectionsSchema = new mongoose.Schema({
  macPrefix: { type: String },
  manufacturer: { type: String },
});

const MacCollections = mongoose.model('MacCollections', macCollectionsSchema);
module.exports = MacCollections;
