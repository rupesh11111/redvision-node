const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addToCart);
router.delete('/:id', auth, cartController.removeFromCart);
router.post('/:id', auth, cartController.quantityUpdate);
router.delete('/', auth, cartController.clearCart);

module.exports = router;
