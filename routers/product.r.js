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

router.get('/home', productController.getProductsForHome);
// Route to get product details by ID
router.get('/details', productController.getProductDetails);

// Route to create a new product
router.post('/create', verifyAdmin, upload.array('image', 10), uploadArray, productController.createProduct);

// Route to update an existing product by ID
router.put('/:id', verifyAdmin, upload.array('newImages'), uploadArray, productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', verifyAdmin, productController.deleteProduct);

// Route to search for products
router.get('/search/:query', productController.getProduct);

router.get('/statistic/category', 
            verifyAdmin,
            productController.statisticProductByCategory);

router.get('/statistic/manufacturer', 
            verifyAdmin,
            productController.statisticProductByManufacturer);

module.exports = router;