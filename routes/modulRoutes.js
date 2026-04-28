const router = require('express').Router();
const { verifyToken, allowRoles } = require('../middleware/auth');
const {
  getAllModul,
  getModulById,
  createModul,
  updateModul,
  deleteModul,
} = require('../controllers/modulController');

router.get('/',    getAllModul);
router.get('/:id', getModulById);

router.post('/',      verifyToken, allowRoles('Guru', 'Admin', 'Staff'), createModul);
router.put('/:id',    verifyToken, allowRoles('Guru', 'Admin', 'Staff'), updateModul);
router.delete('/:id', verifyToken, allowRoles('Guru', 'Admin', 'Staff'), deleteModul);

module.exports = router;