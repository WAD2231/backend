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

            // Find manufacturer_id by manufacturer_name
            const manufacturer = await Manufacturer.getManufacturerByName(manufacturer_name);
            if (!manufacturer) {
                return res.status(404).json({ error: `Manufacturer with name ${manufacturer_name} not found` });
            }
            const manufacturer_id = manufacturer.manufacturer_id;

            // Find category_id by category_name
            const category = await Category.getCategoryByName(category_name);
            if (!category) {
                return res.status(404).json({ error: `Category with name ${category_name} not found` });
            }
            const category_id = category.category_id;

            // Create product
            const product = { name, price, description, manufacturer_id, category_id, image_url };
            const newProduct = await Product.createProduct(product);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).send('An error occurred while creating product');
        }
    }
};