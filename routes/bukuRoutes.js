const router = require('express').Router();
const { verifyToken, allowRoles } = require('../middleware/auth');
const {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku,
} = require('../controllers/bukuController');

router.get('/',    getAllBuku);
router.get('/:id', getBukuById);

router.post('/',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), createBuku);
router.put('/:id',    verifyToken, allowRoles('Guru', 'Admin', 'Staff'), updateBuku);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deleteBuku);

module.exports = router;