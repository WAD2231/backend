const Cart = require('../models/cart.m.js');

module.exports = {
    get: async (req, res) => {
        try {
            const userID = req.user.id;
            const size = parseInt(req.query.size) || 10;
            const page = parseInt(req.query.page) || 1;

            const result = await Cart.get(userID, size, page);
            return res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    add: async (req, res) => {
        try {
            const userID = req.user.id;
            const productID = req.body.product_id;
            await Cart.add(userID, productID);
            return res.status(201).json({ message: 'Product added to cart' });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};