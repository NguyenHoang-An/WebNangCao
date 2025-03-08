const Product = require('../models/Product');
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categories_id');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchProductByName = async (req, res) => {
    try {
        const products = await Product.find({ name: new RegExp(req.query.name, 'i') });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ categories_id: req.params.categoryId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};