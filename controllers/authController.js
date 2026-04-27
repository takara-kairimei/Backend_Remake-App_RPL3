const User = require('../models/user');
const jwt  = require('jsonwebtoken');

const signToken = (user) =>
  jwt.sign(
    { nim_nls: user.nim_nls, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

exports.register = async (req, res) => {
  try {
    const { name, nim_nls, password, role } = req.body;
    const exists = await User.findOne({ nim_nls });
    if (exists) return res.status(400).json({ message: 'NIM/NLS sudah terdaftar' });

    const user = await User.create({ name, nim_nls, password, role });
    res.status(201).json({ token: signToken(user), user: { name: user.name, nim_nls: user.nim_nls, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { nim_nls, password } = req.body;
    const user = await User.findOne({ nim_nls });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'NIM/NLS atau password salah' });

    res.json({ token: signToken(user), user: { name: user.name, nim_nls: user.nim_nls, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findOne({ nim_nls: req.user.nim_nls }).select('-password');
  res.json(user);
};