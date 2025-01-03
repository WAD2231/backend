const Product = require('../models/product.m.js');
const Manufacturer = require('../models/manufacturer.m.js');
const Category = require('../models/category.m.js');
const Attribute = require('../models/attribute.m.js');
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
                page_size: page_size ? parseInt(page_size) : 1,
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
            const productId = parseInt(req.query.product_id);
            if (isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID' });
            }
            const product = await Product.getProductDetail(productId);
            console.log(product);
            if (!product) {
                res.status(404).json({ error: `Product with id ${productId} not found` });
                return;
            }
            const attributes = await Attribute.getAttributes(productId);


            const response = {
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                category: {
                    name: product.category
                },
                manufacturer: {
                    name: product.manufacturer
                },
                description: product.description,
                images: product.image_url ? [product.image_url] : [],
                attributes: attributes.map(attr => ({
                    name: attr.attribute_name,
                    value: attr.value
                }))
            };

            res.status(200).json(response);
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).send('An error occurred while fetching product details');
        }
    },

    //To use this method we will get list of categories, manufacturers and attributes from the methods in their respective controllers.
    //After that we will send the response with category_id, manufacturer_id in the list of categories, manufacturers .
    createProduct: async (req, res) => {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).send('An error occurred while uploading the image');
            }

            try {
                const { name, price, description, manufacturer_id, category_id, attributes } = req.body;
                const image_url = req.file ? req.file.path : null;
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
    //This method will be use same as createProduct method for updating the product with category_id, manufacturer_id.
    updateProduct: async (req, res) => {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).send('An error occurred while uploading the image');
            }

            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ error: 'Invalid product ID' });
                }

                const { name, price, description, manufacturer_id, category_id, attributes } = req.body;
                const image_url = req.file ? req.file.path : null;

                const product = await Product.getProductDetail(id);
                if (!product) {
                    return res.status(404).json({ error: `Product with id ${id} not found` });
                }
                const updatedProduct = { name, price, description, manufacturer_id, category_id, image_url };
                const updated = await Product.updateProduct(id, updatedProduct);

                if (attributes && Array.isArray(attributes)) {
                    await Attribute.deleteAttributesByProductId(id); // Assuming you have a method to delete existing attributes
                    for (const attr of attributes) {
                        const attribute = { attribute_name: attr.name, value: attr.value, product_id: id };
                        await Attribute.createAttribute(attribute);
                    }
                }

                res.status(200).json({ product: updated, attributes });
            } catch (error) {
                res.status(500).send('An error occurred while updating product');
            }
        });
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
    getProduct: async (req, res) => {
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