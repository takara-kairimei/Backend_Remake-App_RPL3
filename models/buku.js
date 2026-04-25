const mongoose = require('mongoose');

const BukuSchema = new mongoose.Schema({
  createdBy:    { type: String, ref: 'User' },     
  name:         { type: String, required: true },
  description:  { type: String },
  year:         { type: Number },
  cloudinaryId: { type: String, ref: 'Image' }, 
}, { timestamps: true });

module.exports = mongoose.model('Buku', BukuSchema);