const router = require('express').Router();
const OrderC = require('../controllers/order.c');

router.post('/payment', OrderC.processPayment);

module.exports = router;