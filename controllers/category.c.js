const Category = require('../models/category.m.js');
const createRecursiveCategories = require("../helpers/createRecursiveCategories.js")
module.exports = {
    getProductsInCategory: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const products = await Category.getProductsInCategory(id);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('An error occurred while fetching products in category');
        }
    },

    getCategories: async (req, res) => {
        try {
            const categories = await Category.getCategories();
            const recursiveCategories = createRecursiveCategories(categories);
            res.status(200).json({
                categories: recursiveCategories
            });
        } catch (error) {
            console.error(error);
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
            const { name, thumbnail, description, super_category_id } = req.body;
            const category = { name, thumbnail, description, super_category_id };
            const newCategory = await Category.createCategory(category);
            res.status(201).json({ category: newCategory });
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred while creating category');
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, description, thumbnail_url, super_category_id } = req.body;

            const thumbnail = thumbnail_url ? thumbnail_url : req.body.thumbnail

            const category = { name, thumbnail, description, super_category_id: parseInt(super_category_id)};
            const updatedCategory = await Category.updateCategory(id, category);
            res.status(200).json({ category: updatedCategory });
        } catch (error) {
            console.log(error);
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