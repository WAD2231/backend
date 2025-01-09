const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.c.js');

// Route to get all categories
router.get('/', categoryController.getCategories);

// Route to get category details by ID
router.get('/:id', categoryController.getCategoryDetail);

// Route to create a new category
router.post('/', categoryController.createCategory);

// Route to update an existing category by ID
router.put('/:id', categoryController.updateCategory);

// Route to delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

// Route to get products in a specific category
router.get('/products/:field/:value', categoryController.getProductsInCategory);

module.exports = router;
