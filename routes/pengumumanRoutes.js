const router = require('express').Router();
const { verifyToken, allowRoles } = require('../middleware/auth');
const {
  getAllPengumuman,
  getPengumumanById,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
} = require('../controllers/pengumumanController');

// Public
router.get('/',    getAllPengumuman);
router.get('/:id', getPengumumanById);

// Protected
router.post('/',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), createPengumuman);
router.put('/:id',    verifyToken, allowRoles('Guru', 'Admin', 'Staff'), updatePengumuman);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deletePengumuman);

module.exports = router;