const Product = require("../models/Product");
const upload = require("./upload");

// Create product
exports.createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const image = (req.files[0]).location
    try {
        let product = new Product({ name, description, price, category, stock , image});
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
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { name, description, price, category, stock } },
            { new: true }
        );

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: "Product removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: false, message: err.message });
    }
};
