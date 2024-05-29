const Cart = require('../models/Cart');

// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }
        return res.send({ status: true, message: 'Cart retrieved successfully', data: cart });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
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
        return res.send({ status: true, message: 'product added to cart', data: cart });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

exports.quantityUpdate = async (req, res) => {
    const productId = req.params.id;
    const {action} = req.body
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }

        cart.products = cart.products.map(p => {
            if(p.product.toString() === productId ){
                if(action == "increase") {
                    p.quantity++;
                } else if(action == "decrease") {
                    p.quantity--;
                } 
            }
            return p
        });

        await cart.save();

        return res.send({ status: true, message: 'Product from cart removed successfully', data: cart });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const productId = req.params.id;

    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        return res.send({ status: true, message: 'Product from cart removed successfully', data: cart });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }

        cart.products = [];

        await cart.save();
        return res.send({ status: true, message: 'Cart Cleared Successfully', data: cart });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
