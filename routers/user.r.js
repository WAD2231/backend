const router = require('express').Router();
const UserC = require('../controllers/user.c');
const {verifyUser, verifyAdmin} = require('../middlewares/authorize');

router.get('/', verifyUser, UserC.getUsers);
router.get('/:id', verifyUser, UserC.getUser);
router.post('/', verifyUser, UserC.createUser);
router.put('/:id', verifyUser, UserC.updateUser);
router.delete('/:id', verifyUser, UserC.deleteUser);
router.get('/statistics/new-users', verifyAdmin, UserC.getNewUserCount);

module.exports = router;