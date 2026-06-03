const router   = require('express').Router();
const multer   = require('multer');
const { verifyToken, allowRoles } = require('../middleware/auth');
const { uploadImage, getAllImage, deleteImage } = require('../controllers/imageController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/',       verifyToken, getAllImage);
router.post('/upload', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), upload.single('image'), uploadImage);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deleteImage);

module.exports = router;