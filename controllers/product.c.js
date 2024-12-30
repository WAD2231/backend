const Product = require('../models/product.m.js');
const Manufacturer = require('../models/manufacturer.m.js'); // Assuming you have a model for manufacturer
const Category = require('../models/category.m.js'); // Assuming you have a model for category

module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('An error occurred while fetching products');
        }
    },
    getProductDetails: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const product = await Product.getProductDetail(id);
            if (!product) {
                res.status(404).json({ error: `Product with id ${id} not found` });
                return;
            }
            const reviews = await Review.getReviews(id);
            res.status(200).json({ ...product, reviews });
        } catch (err) {
            res.status(500).send('An error occurred while fetching product details');
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, price, description, manufacturer_name, category_name, image_url } = req.body;

            const manufacturer = await Manufacturer.getManufacturerByName(manufacturer_name);
            if (!manufacturer) {
                return res.status(404).json({ error: `Manufacturer with name ${manufacturer_name} not found` });
            }
            const manufacturer_id = manufacturer.manufacturer_id;

            const category = await Category.getCategoryByName(category_name);
            if (!category) {
                return res.status(404).json({ error: `Category with name ${category_name} not found` });
            }
            const category_id = category.category_id;

            const product = { name, price, description, manufacturer_id, category_id, image_url };
            const newProduct = await Product.createProduct(product);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).send('An error occurred while creating product');
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const product = await Product.getProductDetail(id);
            if (!product) {
                res.status(404).json({ error: `Product with id ${id} not found` });
                return;
            }

            const { name, price, description, manufacturer_name, category_name, image_url } = req.body;

            const manufacturer = await Manufacturer.getManufacturerByName(manufacturer_name);
            if (!manufacturer) {
                return res.status(404).json({ error: `Manufacturer with name ${manufacturer_name} not found` });
            }
            const manufacturer_id = manufacturer.manufacturer_id;

            const category = await Category.getCategoryByName(category_name);
            if (!category) {
                return res.status(404).json({ error: `Category with name ${category_name} not found` });
            }
            const category_id = category.category_id;

            const updatedProduct = { ...product, name, price, description, manufacturer_id, category_id, image_url };
            const updated = await Product.updateProduct(id, updatedProduct);
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ error: `Product with id ${id} not found` });
            }
        } catch (error) {
            res.status(500).send('An error occurred while updating product');
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const deleted = await Product.deleteProduct(id);
            if (deleted) {
                res.status(204).send('Product deleted successfully');
            } else {
                res.status(404).json({ error: `Product with id ${id} not found` });
            }
        } catch (error) {
            res.status(500).send('An error occurred while deleting product');
        }
    },
    getProduct: async(req,res) => {
        try {
            const query = req.params.query;
            const productsByName = await Product.getProducts('product_name', query);
            const productsByCategory = await Category.getProductsInCategory('name', query);
            const productsById = await Product.getProducts('product_id', query);
            const products = [...productsByName, ...productsByCategory, ...productsById];
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('An error occurred while fetching products');
        }
    }
};