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
    }
};