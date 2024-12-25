const router = require('express').Router();
const CartC = require('../controllers/cart.c');

router.get('/items', CartC.getItems);

router.post('/items', CartC.addItem);

router.delete('/items/:id', CartC.deleteItem);

router.put('/items/:id', CartC.updateItem);

module.exports = router;