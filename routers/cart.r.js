const router = require('express').Router();
const CartC = require('../controllers/cart.c');
const {verifyUser} = require('../middlewares/authorize');

router.get('/', verifyUser, CartC.get);

router.post('/', verifyUser, CartC.add);

router.post('/items', verifyUser, CartC.addItems);

router.put('/:id', verifyUser, CartC.update);

router.delete('/:id', verifyUser, CartC.delete);

module.exports = router;