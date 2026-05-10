const mongoose = require('mongoose');

const BeritaSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  summary:      { type: String, required: true }, 
  content:      { type: String, required: true }, 
  imageUrl:     { type: String, default: '' },    
  cloudinaryId: { type: String, default: '' },    
}, { timestamps: true });

module.exports = mongoose.model('Berita', BeritaSchema);