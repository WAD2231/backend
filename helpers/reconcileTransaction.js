const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');
const Order = require('../models/order.m');
const processPayment = require('./processPayment')

module.exports = cron.schedule('0 * * * *', async () => {
    const pendingOrders = await Order.getPendingOrders();
    for (let order of pendingOrders) {
        const token = jwt.sign(order, priKey, {algorithm: 'RS256'});
        const response = await fetch(`https://localhost:${process.env.EPAY_PORT}/api/transactions/reconcile?token=${token}`);
        if (response.status === 200) {
            await Order.updateStatus(order.order_id);
        }
        else if (response.status === 404) {
            await processPayment(token, 1);
            if (response.status === 201) {
                await Order.updateStatus(order.order_id);
            }
        }
    }
});