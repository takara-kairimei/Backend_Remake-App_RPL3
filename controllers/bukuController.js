const Buku = require('../models/buku');

exports.getAllBuku = async (req, res) => {
  try {
    const buku = await Buku.find().sort({ createdAt: -1 });
    res.json(buku);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBukuById = async (req, res) => {
  try {
    const buku = await Buku.findById(req.params.id);
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(buku);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBuku = async (req, res) => {
  try {
    const { name, description, year, cloudinaryId } = req.body;
    const buku = new Buku({
      name,
      description,
      year,
      cloudinaryId,
      createdBy: req.user.nim_nls,
    });
    await buku.save();
    res.status(201).json(buku);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBuku = async (req, res) => {
  try {
    const buku = await Buku.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(buku);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBuku = async (req, res) => {
  try {
    const buku = await Buku.findByIdAndDelete(req.params.id);
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};