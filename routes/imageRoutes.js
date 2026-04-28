const router   = require('express').Router();
const multer   = require('multer');
const path     = require('path');
const { verifyToken, allowRoles } = require('../middleware/auth');
const { uploadImage, getAllImage, deleteImage } = require('../controllers/imageController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get('/',       verifyToken, getAllImage);
router.post('/upload', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), upload.single('image'), uploadImage);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deleteImage);

module.exports = router;