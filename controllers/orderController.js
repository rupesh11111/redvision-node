const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Place a new order from the user's cart
exports.placeOrder = async (req, res) => {
    try {
        // Get the user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Calculate total price
        let totalPrice = 0;
        const orderProducts = cart.products.map(({ product, quantity }) => {
            totalPrice += product.price * quantity;
            return { product: product._id, quantity };
        });

        // Create a new order
        const order = new Order({
            user: req.user.id,
            products: orderProducts,
            totalPrice,
            status: 'pending',
        });

        // Save the order
        await order.save();

        // Clear the user's cart
        cart.products = [];
        await cart.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get orders for the logged-in user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product').populate('user');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
