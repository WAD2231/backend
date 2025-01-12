const fs = require('fs');
const jwt = require('jsonwebtoken');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');
const Order = require('../models/order.m');
const User = require('../models/user.m');
const processPayment = require('../helpers/processPayment');

module.exports = { 
    createOrder: async (req, res) => {
        try {
            // Create order
            const order = {
                ...req.body,
                user_id: req.user.user_id
            } 
            const orderID = await Order.createOrder(order);

            // Get account id
            const accountID = await User.getAccountID(req.user.user_id);

            // Create token
            const token = jwt.sign({
                order_id: orderID,
                account_id: accountID,
                amount: req.body.total
            }, priKey, {algorithm: 'RS256'});

            const response = await processPayment(token, 1);

            if (response.status === 201) {
                await Order.updateStatus(orderID);
            }
            return res.status(response.status).json(response.message);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    getRevenueByMonth: async (req, res) => {
        try {
            const sales = await Order.getRevenueByMonth();
            return res.status(200).json(sales);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    getBestSellers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const topProducts = await Order.getBestSellers(limit);
            return res.status(200).json(topProducts);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    getTopCustomers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const topCustomers = await Order.getTopCustomers(limit);
            return res.status(200).json(topCustomers);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    getOrdersOfUser: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 10;
            const order = req.query.order || 'id_asc';
            const status = req.query.status;
            const date = req.query.date;
            const orders = await Order.getOrdersOfUser(req.user.user_id, page, size, order, status, date);
            return res.status(200).json(orders);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    getOrders: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 10;
            const sort = req.query.sort || 'id_asc';
            const status = req.query.status;
            const data = await Order.getOrders(page, size, sort, status);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
};