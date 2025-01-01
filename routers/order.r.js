const router = require('express').Router();
const OrderC = require('../controllers/order.c');

router.post('/', OrderC.createOrder);

module.exports = router;