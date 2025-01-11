const Product = require('../models/product.m.js');
const Category = require('../models/category.m.js');
const Attribute = require('../models/attribute.m.js');
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
            const productId = parseInt(req.query.product_id);
            if (isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID' });
            }
            const product = await Product.getProductDetail(productId);
            if (!product) {
                return res.status(404).json({ error: `Product with id ${productId} not found` });
            }
            const attributes = await Attribute.getAttributes(productId);
            const relatedProducts = await Product.getSameTypeProductInCategory(product.id);
            const response = {
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                created_at: product.created_at,
                tag: product.tag,
                category_id: product.category_id,
                categoryName: product.category,
                manufacturer_id: product.manufacturer_id,
                manufacturerName: product.manufacturer,
                description: product.description,
                images: product.images,
                attributes: attributes.map(attr => ({
                    name: attr.attribute_name,
                    value: attr.value
                })),
                relatedProducts: relatedProducts.map(relatedProduct => ({
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.price,
                    discount: relatedProduct.discount,
                    images: relatedProduct.images
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
        try {
            const { name, price, description, manufacturer_id, category_id, attributes, images, stock, discount, tag } = req.body;
            const product = { name, price: parseInt(price), discount: parseFloat(discount), description, stock: parseInt(stock), manufacturer_id: parseInt(manufacturer_id), category_id: parseInt(category_id), images, tag };
            const newProduct = await Product.createProduct(product);
            if (attributes && Array.isArray(attributes)) {
                for (const attr of attributes) {
                    const attribute = { attribute_name: attr.name, value: attr.value, product_id: newProduct.product_id };
                    await Attribute.createAttribute(attribute);
                }
            }

            res.status(201).json({ product: newProduct, attributes });
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred while creating product');
        }
    },
    //This method will be use same as createProduct method for updating the product with category_id, manufacturer_id.
    updateProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid product ID' });
            }

            const { name, price, description, manufacturer_id, category_id, stock, images = [], oldImages = [], attributes, discount, tag } = req.body;

            const image_url = [...oldImages, ...images];

            const product = await Product.getProductDetail(id);
            if (!product) {
                return res.status(404).json({ error: `Product with id ${id} not found` });
            }
            const updatedProduct = { name, price, description, manufacturer_id, category_id, image_url, stock, discount, tag };

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
            console.log(error);
            res.status(500).send('An error occurred while updating product');
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Product.deleteProduct(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.log(error);
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

    statisticProductByCategory: async (req, res) => {
        try {
            const result = await Product.statisticProductByCategory();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    statisticProductByManufacturer: async (req, res) => {
        try {
            const result = await Product.statisticProductByManufacturer();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};