const Cart = require('../models/cart.m.js');
const CartItem = require('../models/cart-item.m.js');

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
            const items = await CartItem.getItems(userID);
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
            const existingItem = await CartItem.getItem(cartID, productID);
            if (existingItem) {
                CartItem.updateItem(cartID, productID, existingItem.quantity + 1);
                return res.status(200).json(existingItem);
            }
            else {
                const item = await CartItem.addItem(cartID, productID);
                res.status(201).json(item);
            }
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
            await CartItem.deleteItem(cartID, itemID);
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
            const item = await CartItem.updateItem(cartID, itemID, quantity);
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).send('An error occurred while updating the item');
        }
    }
};