const Modul = require('../models/modul');

exports.getAllModul = async (req, res) => {
  try {
    const modul = await Modul.find().sort({ createdAt: -1 });
    res.json(modul);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getModulById = async (req, res) => {
  try {
    const modul = await Modul.findById(req.params.id);
    if (!modul) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    res.json(modul);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createModul = async (req, res) => {
  try {
    const { name, description } = req.body;
    const modul = new Modul({
      name,
      description,
      createdBy: req.user.nim_nls,
    });
    await modul.save();
    res.status(201).json(modul);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateModul = async (req, res) => {
  try {
    const modul = await Modul.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!modul) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    res.json(modul);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteModul = async (req, res) => {
  try {
    const modul = await Modul.findByIdAndDelete(req.params.id);
    if (!modul) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    res.json({ message: 'Modul berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};