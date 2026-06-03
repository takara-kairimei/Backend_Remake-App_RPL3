const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

module.exports = connectDB;