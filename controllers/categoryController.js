const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const products = await Product.find({ categories_id: req.params.id });
        const subCategories = await Category.find({ parent_category_id: req.params.id });
        
        if (products.length > 0 || subCategories.length > 0) {
            return res.status(400).json({ error: 'Cannot delete category with products or subcategories' });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent_category_id');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

