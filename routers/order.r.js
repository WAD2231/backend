const router = require('express').Router();
const OrderC = require('../controllers/order.c');
const {verifyUser, verifyAdmin} = require('../middlewares/authorize');

router.post('/', verifyUser, OrderC.createOrder);

router.get('/history', verifyUser, OrderC.getOrdersOfUser);

router.get('/', verifyAdmin, OrderC.getOrders);

router.get('/statistics/revenue', verifyAdmin, OrderC.getRevenueByMonth);

router.get('/statistics/best-sellers', verifyAdmin, OrderC.getBestSellers);

router.get('/statistics/top-customers', verifyAdmin, OrderC.getTopCustomers);

module.exports = router;