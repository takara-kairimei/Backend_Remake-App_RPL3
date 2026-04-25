const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  cloudinaryId: { type: String, required: true, unique: true }, 
  name:         { type: String, required: true },
  url:          { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Image', ImageSchema);