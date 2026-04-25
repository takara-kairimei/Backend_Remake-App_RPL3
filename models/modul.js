const mongoose = require('mongoose');

const ModulSchema = new mongoose.Schema({
  createdBy:   { type: String, ref: 'User' },
  name:        { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Modul', ModulSchema);