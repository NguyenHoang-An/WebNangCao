const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct, searchProductByName, getProductsByCategory } = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search', searchProductByName);
router.get('/category/:categoryId', getProductsByCategory);

module.exports = router;