const router = require('express').Router();
const CartC = require('../controllers/cart.c');

router.get('/', CartC.get);

router.post('/', CartC.add);

module.exports = router;