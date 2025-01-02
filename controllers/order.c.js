const fs = require('fs');
const jwt = require('jsonwebtoken');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');
const Order = require('../models/order.m');
const User = require('../models/user.m');

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

            // Process payment
            const token = jwt.sign({
                order_id: orderID,
                account_id: accountID,
                amount: req.body.total
            }, priKey, {algorithm: 'RS256'});
            const response = await fetch(`https://localhost:${process.env.EPAY_PORT}/api/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            });

            if (response.status === 201) {
                await Order.updateStatus(orderID);
            }

            const result = await response.json();
            return res.status(response.status).json(result);
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
    }
};