const router = require('express').Router();
const TransactionC = require('../controllers/transaction.c');

router.post('/', TransactionC.createTransaction);

router.get('/reconcile', TransactionC.reconcileTransaction);

module.exports = router;