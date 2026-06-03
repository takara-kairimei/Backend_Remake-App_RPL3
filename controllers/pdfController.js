const cloudinary = require('../config/cloudinary');
const Pdf = require('../models/pdf'); 
exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Tidak ada file yang diupload' });

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'backend_app/pdfs',
      resource_type: 'raw',       
    });

    const newPdf = new Pdf({
      cloudinaryId: result.public_id,
      name: req.file.originalname,
      url: result.secure_url,
    });

    await newPdf.save();
    res.status(201).json(newPdf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPdf = async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'File PDF tidak ditemukan' });

    const downloadUrl = pdf.url.replace('/upload/', '/upload/fl_attachment/');
    
    res.redirect(downloadUrl);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: 'File PDF tidak ditemukan' });

    await cloudinary.uploader.destroy(pdf.cloudinaryId, { resource_type: 'raw' });
    await Pdf.findByIdAndDelete(req.params.id);

    res.json({ message: 'File PDF berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};