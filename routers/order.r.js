const router = require('express').Router();
const OrderC = require('../controllers/order.c');

router.post('/', OrderC.createOrder);

router.get('/statistics/revenue', OrderC.getRevenueByMonth);

router.get('/statistic/best-sellers', OrderC.getBestSellers);

module.exports = router;