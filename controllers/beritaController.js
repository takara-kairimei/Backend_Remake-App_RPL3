const Berita = require('../models/berita');

exports.getAllBerita = async (req, res) => {
  try {
    const berita = await Berita.find()
      .select('title summary imageUrl createdBy createdAt')
      .sort({ createdAt: -1 });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBerita = async (req, res) => {
  try {
    const { title, summary, content, imageUrl, cloudinaryId } = req.body;
    const berita = new Berita({
      title,
      summary,
      content,
      imageUrl,
      cloudinaryId,
      createdBy: req.user.nim_nls,
    });
    await berita.save();
    res.status(201).json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findByIdAndDelete(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};