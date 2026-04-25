const mongoose = require('mongoose');

const BeritaSchema = new mongoose.Schema({
  cloudinaryId: { type: String, ref: 'Image' }, 
  content:      { type: String, required: true },
  title:        { type: String, required: true },
  createdBy:    { type: String, ref: 'User' }, 
}, { timestamps: true });

module.exports = mongoose.model('Berita', BeritaSchema);