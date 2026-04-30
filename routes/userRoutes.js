const router = require('express').Router();
const { verifyToken, allowRoles } = require('../middleware/auth');
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
} = require('../controllers/userController');

router.get('/',    verifyToken, allowRoles('Admin'), getAllUser);
router.get('/:id', verifyToken, allowRoles('Admin'), getUserById);
router.post('/',   verifyToken, allowRoles('Admin'), createUser);
router.put('/:id', verifyToken, allowRoles('Admin'), updateUser);

module.exports = router;