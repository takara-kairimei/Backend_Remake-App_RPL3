const express = require('express');
const router  = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku
} = require('../controllers/bukuController');

router.get('/',       getAllBuku);
router.get('/:id',    getBukuById);
router.post('/',      verifyToken, createBuku);
router.put('/:id',    verifyToken, updateBuku);
router.delete('/:id', verifyToken, deleteBuku);

module.exports = router;