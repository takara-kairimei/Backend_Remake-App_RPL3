const mongoose = require('mongoose');

const PengumumanSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  createdBy: { type: String, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Pengumuman', PengumumanSchema);