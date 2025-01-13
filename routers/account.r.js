const router = require('express').Router();
const AccountC = require('../controllers/account.c.js');

router.post('/', AccountC.createAccount);

router.get('/', AccountC.getBalance);

module.exports = router;