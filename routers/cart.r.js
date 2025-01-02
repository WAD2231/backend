const router = require('express').Router();
const CartC = require('../controllers/cart.c');

router.get('/', CartC.get);

router.post('/', CartC.add);

router.put('/:id', CartC.update);

router.delete('/:id', CartC.delete);

module.exports = router;