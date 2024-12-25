const Cart = require('../models/cart.m.js');

module.exports = {
    createCart: async (req, res) => {
        try {
            const userID = req.user.user_id;
            const cart = await Cart.createCart(userID);
            res.status(201).json(cart);
        }
        catch (error) {
            res.status(500).send('An error occurred while creating the cart');
        }
    },

    getItems: async (req, res) => {
        try {
            const userID = req.user.user_id;
            const items = await Cart.getItems(userID);
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).send('An error occurred while getting the items');
        }
    },

    addItem: async (req, res) => {
        try {
            const userID = req.user.user_id;
            const productID = req.body.product_id;
            const cartID = await Cart.getCart(userID);
            const item = await Cart.addItem(cartID, productID);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(500).send('An error occurred while adding the item');
        }
    },

    deleteItem: async (req, res) => {
        try {
            const userID = req.user.user_id;
            const itemID = req.params.id;
            const cartID = await Cart.getCart(userID);
            await Cart.deleteItem(cartID, itemID);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).send('An error occurred while deleting the item');
        }
    },

    updateItem: async (req, res) => {
        try {
            const userID = req.user.user_id;
            const itemID = req.params.id;
            const quantity = req.body.quantity;
            const cartID = await Cart.getCart(userID);
            const item = await Cart.updateItem(cartID, itemID, quantity);
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).send('An error occurred while updating the item');
        }
    }
};