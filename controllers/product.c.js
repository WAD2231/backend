const Product = require('../models/product.m.js');
const Manufacturer = require('../models/manufacturer.m.js'); 
const Category = require('../models/category.m.js');
const Attribute=require('../models/attribute.m.js');
const Review = require('../models/review.m.js');
const { up } = require('../migrations/20241231103744_create_coupon_table.js');
const upload = require('../middlewares/upload');
module.exports = {
    getProducts: async (req, res) => {
        try {
            const { category_id, search, page_size, current_page } = req.query;
            const filters = {
                category_id: category_id ? parseInt(category_id) : null,
                search: search || '',
                page_size: page_size ? parseInt(page_size) : 10,
                current_page: current_page ? parseInt(current_page) : 1
            };
            const result = await Product.getProducts(filters);
            res.status(200).json(result);
        } catch (error) {
            console.error(error); // Log the error for debugging
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
            const attribute = await Attribute.getAttributes(id);
            res.status(200).json({ product, reviews, ...attribute });
        } catch (err) {
            res.status(500).send('An error occurred while fetching product details');
        }
    },
    createProduct: async (req, res) => {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).send('An error occurred while uploading the image');
            }

            try {
                const { name, price, description, manufacturer_name, category_name, attributes } = req.body;
                const image_url = req.file ? req.file.path : null;

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

                if (attributes && Array.isArray(attributes)) {
                    for (const attr of attributes) {
                        const attribute = { attribute_name: attr.name, value: attr.value, product_id: newProduct.product_id };
                        await Attribute.createAttribute(attribute);
                    }
                }

                res.status(201).json({ product: newProduct, attributes });
            } catch (error) {
                res.status(500).send('An error occurred while creating product');
            }
        });
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
            const productsByName = await Product.getProduct('product_name', query);
            const productsByCategory = await Category.getProductsInCategory('name', query);
            const productsById = await Product.getProduct('product_id', query);
            const products = [...productsByName, ...productsByCategory, ...productsById];
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send('An error occurred while fetching products');
        }
    },
};