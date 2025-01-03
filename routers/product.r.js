const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c.js');
const upload = require('../middlewares/upload');

// Route to get filtered products with pagination
router.get('/', productController.getProducts);

// Route to get product details by ID
router.get('/details', productController.getProductDetails);

// Route to create a new product
router.post('/create', upload.single('image'), productController.createProduct);

// Route to update an existing product by ID
router.put('/:id', upload.single('image'), productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to search for products
router.get('/search/:query', productController.getProduct);

module.exports = router;