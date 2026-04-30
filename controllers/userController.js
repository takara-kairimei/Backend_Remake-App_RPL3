const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Get semua user
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buat akun baru (by admin)
exports.createUser = async (req, res) => {
  try {
    const { name, nim_nls, password, role } = req.body;
    const exists = await User.findOne({ nim_nls });
    if (exists) return res.status(400).json({ message: 'NIM/NLS sudah terdaftar' });

    const user = new User({ name, nim_nls, password, role });
    await user.save();
    res.status(201).json({ 
      message: 'Akun berhasil dibuat',
      user: { name: user.name, nim_nls: user.nim_nls, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit kredensial user
exports.updateUser = async (req, res) => {
  try {
    const { name, nim_nls, password, role } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    if (name)    user.name    = name;
    if (nim_nls) user.nim_nls = nim_nls;
    if (role)    user.role    = role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ 
      message: 'Akun berhasil diupdate',
      user: { name: user.name, nim_nls: user.nim_nls, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};