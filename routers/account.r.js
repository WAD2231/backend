const router = require('express').Router();
const AccountC = require('../controllers/account.c.js');

router.post('/', AccountC.createAccount);

module.exports = router;