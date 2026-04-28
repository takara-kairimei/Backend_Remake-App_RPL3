const cloudinary = require('../config/cloudinary');
const Image = require('../models/image');

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Tidak ada file yang diupload' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'backend_app',
    });

    const image = new Image({
      cloudinaryId: result.public_id,
      name: req.file.originalname,
      url: result.secure_url,
    });

    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get semua image
exports.getAllImage = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image tidak ditemukan' });

    await cloudinary.uploader.destroy(image.cloudinaryId);
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};