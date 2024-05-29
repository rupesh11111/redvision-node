const Product = require("../models/Product");

// Create product
exports.createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const image = (req?.files && (req?.files).length) ? (req.files[0]).location : null
    try {
        let product = new Product({ name, description, price, category, stock, image });
        await product.save();
        res.json({
            status: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ status: true, message: "Product list retrieved successfully", data: products });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: true, message: "Product not found" });
        }
        res.json({ status: true, message: "Product retrieved successfully", data: product });
    } catch (err) {
        res.status(500).send({ status: true, message: err.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    const image = (req?.files && (req?.files).length) ? (req.files[0]).location : null

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ status: true, message: "Product not found" });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { name, description, price, category, stock, image } },
            { new: true }
        );

        res.json({ status: true, message: "Product updated successfully", data: product });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ status: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
