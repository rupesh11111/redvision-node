const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post('/', auth, orderController.placeOrder);
router.get('/myOrders', auth, orderController.getUserOrders);
router.get('/', auth, admin, orderController.getAllOrders);

module.exports = router;
