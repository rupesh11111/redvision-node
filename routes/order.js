const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.post('/', auth, orderController.placeOrder);
router.get('/me', auth, orderController.getUserOrders);
router.get('/', auth, orderController.getAllOrders);

module.exports = router;
