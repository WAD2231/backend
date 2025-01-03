const Category = require('../models/category.m.js');

module.exports = {
    getProductsInCategory: async (req, res) => {
        try {
            const { field, value } = req.params;
            const products = await Category.getProductsInCategory(field, value);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('An error occurred while fetching products in category');
        }
    },

    getCategories: async (req, res) => {
        try {
            const { page_size, current_page } = req.query;
            const filters = {
                page_size: page_size ? parseInt(page_size) : null,
                current_page: current_page ? parseInt(current_page) : 1
            };
            const result = await Category.getCategories(filters);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('An error occurred while fetching categories');
        }
    },
    getCategoryDetail: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.id);
            const category = await Category.getCategoryDetail(categoryId);
            if (!category) {
                res.status(404).json({ error: `Category with id ${categoryId} not found` });
                return;
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).send('An error occurred while fetching category details');
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name, thumbnail, description } = req.body;
            const category = { name, thumbnail, description };
            const newCategoryId = await Category.createCategory(category);
            res.status(201).json({ category_id: newCategoryId });
        } catch (error) {
            res.status(500).send('An error occurred while creating category');
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, thumbnail, description } = req.body;
            const category = { name, thumbnail, description };
            const updatedCategoryId = await Category.updateCategory(id, category);
            res.status(200).json({ category_id: updatedCategoryId });
        } catch (error) {
            res.status(500).send('An error occurred while updating category');
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Category.deleteCategory(id);
            res.status(204).send('Category deleted successfully');
        } catch (error) {
            res.status(500).send('An error occurred while deleting category');
        }
    }
};