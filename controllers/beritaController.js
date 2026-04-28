const Berita = require('../models/berita');

// Get semua berita
exports.getAllBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ createdAt: -1 });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get satu berita
exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buat berita baru
exports.createBerita = async (req, res) => {
  try {
    const { title, content, cloudinaryId } = req.body;
    const berita = new Berita({
      title,
      content,
      cloudinaryId,
      createdBy: req.user.nim_nls,
    });
    await berita.save();
    res.status(201).json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update berita
exports.updateBerita = async (req, res) => {
  try {
    const berita = await Berita.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus berita
exports.deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findByIdAndDelete(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};