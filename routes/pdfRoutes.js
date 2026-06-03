const router   = require('express').Router();
const multer   = require('multer');
const { verifyToken, allowRoles } = require('../middleware/auth');
const { uploadPdf, getAllPdf, downloadPdf, deletePdf } = require('../controllers/pdfController');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF yang diizinkan!'), false);
  }
};

const upload = multer({ 
  storage: multer.memoryStorage(), 
  fileFilter,
  limits: { 
    fileSize: 200 * 1024 * 1024 // 200MB
  } 
});

router.get('/',             verifyToken, getAllPdf);
router.post('/upload',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), upload.single('pdf'), uploadPdf);
router.get('/download/:id', verifyToken, downloadPdf); 
router.delete('/:id',       verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deletePdf);

module.exports = router;