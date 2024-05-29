const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post('/', auth, admin, productController.createProduct);
router.get('/', auth, productController.getProducts);
router.get('/:id', auth, productController.getProductById);
router.put('/:id', auth, admin, productController.updateProduct);
router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router
