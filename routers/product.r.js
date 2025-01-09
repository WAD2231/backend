const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c.js');
const multer = require("multer");
const uploadSingle = require("../middlewares/uploadSingle");
const uploadArray = require("../middlewares/uploadArray");
const { verifyAdmin } = require("../middlewares/authorize.js");
const upload = multer();

// Route to get filtered products with pagination
router.get('/', productController.getProducts);

// Route to get product details by ID
router.get('/details', productController.getProductDetails);

// Route to create a new product
router.post('/create', verifyAdmin, upload.array('image', 10), uploadArray, productController.createProduct);

// Route to update an existing product by ID
router.put('/:id', verifyAdmin, upload.single('image'), uploadSingle, productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to search for products
router.get('/search/:query', productController.getProduct);

module.exports = router;