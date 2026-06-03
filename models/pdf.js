const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  cloudinaryId: { type: String, required: true, unique: true },
  name:         { type: String, required: true },
  url:          { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pdf', PdfSchema);