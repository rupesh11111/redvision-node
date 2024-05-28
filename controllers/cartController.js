const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add a product to the cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.products = [];

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
