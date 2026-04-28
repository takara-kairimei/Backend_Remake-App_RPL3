const router = require('express').Router();
const { verifyToken, allowRoles } = require('../middleware/auth');
const {
  getAllBerita,
  getBeritaById,
  createBerita,
  updateBerita,
  deleteBerita,
} = require('../controllers/beritaController');

// Public
router.get('/',    getAllBerita);
router.get('/:id', getBeritaById);

// Protected
router.post('/',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), createBerita);
router.put('/:id',    verifyToken, allowRoles('Guru', 'Admin', 'Staff'), updateBerita);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deleteBerita);

module.exports = router;