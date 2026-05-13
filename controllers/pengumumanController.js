const Pengumuman = require('../models/pengumuman');

// Get semua pengumuman
exports.getAllPengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.find()
      .select('title createdAt')
      .sort({ createdAt: -1 });
    res.json(pengumuman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get detail pengumuman
exports.getPengumumanById = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findById(req.params.id);
    if (!pengumuman) return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    res.json(pengumuman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buat pengumuman baru
exports.createPengumuman = async (req, res) => {
  console.log('BODY:', req.body);
  console.log('USER:', req.user);
  try {
    const { title, content } = req.body;
    const pengumuman = new Pengumuman({
      title,
      content,
      createdBy: req.user.nim_nls,
    });
    await pengumuman.save();
    res.status(201).json(pengumuman);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update pengumuman
exports.updatePengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pengumuman) return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    res.json(pengumuman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus pengumuman
exports.deletePengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findByIdAndDelete(req.params.id);
    if (!pengumuman) return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    res.json({ message: 'Pengumuman berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};