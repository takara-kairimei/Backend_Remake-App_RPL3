const router   = require('express').Router();
const multer   = require('multer');
const path     = require('path');
const { verifyToken, allowRoles } = require('../middleware/auth');
const { uploadPdf, getAllPdf, downloadPdf, deletePdf } = require('../controllers/pdfController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/pdfs/'), 
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF yang diizinkan!'), false);
  }
};


const upload = multer({ 
  storage, 
  fileFilter,
  limits: { 
    fileSize: 200 * 1024 * 1024 
  } 
});

router.get('/',             verifyToken, getAllPdf);
router.post('/upload',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), upload.single('pdf'), uploadPdf);
router.get('/download/:id', verifyToken, downloadPdf); 
router.delete('/:id',       verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deletePdf);

module.exports = router;