const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c.js');

// Route to get all products
router.get('/', productController.getProducts);

// Route to get product details by ID
router.get('/:id', productController.getProductDetails);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update an existing product by ID
router.put('/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to search for products
router.get('/search', productController.getProduct);

module.exports = router;