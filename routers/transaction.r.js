const router = require('express').Router();
const TransactionC = require('../controllers/transaction.c');

router.post('/', TransactionC.createTransaction);

module.exports = router;