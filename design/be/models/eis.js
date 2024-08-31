const mongoose = require('mongoose');

const eisSchema = new mongoose.Schema({
  deptName: { type: String },
  itemName: { type: String },
  region: { type: String },
  mac: { type: String },
  status: { type: String },
  subCatName: { type: String },
  employeeName: { type: String },
  userNo: { type: String },
});

const Eis = mongoose.model('Eis', eisSchema);
module.exports = Eis;
