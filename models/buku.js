const mongoose = require('mongoose');

const BukuSchema = new mongoose.Schema({
  createdBy:   { type: String, ref: 'User' },
  name:        { type: String, required: true },
  description: { type: String },
  year:        { type: Number },
  pdfId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Pdf' },
}, { timestamps: true });

module.exports = mongoose.model('Buku', BukuSchema);