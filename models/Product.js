const mongoose = require('mongoose'); // Thêm dòng này để import mongoose

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
    categories_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    images: [String],
    show: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
