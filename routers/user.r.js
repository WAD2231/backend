const router = require('express').Router();
const UserC = require('../controllers/user.c');
const {verifyUser, verifyAdmin} = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();
const uploadSingle = require('../middlewares/uploadSingle');

router.post('/', UserC.createUser);
router.get('/', verifyAdmin, UserC.getUsers);
router.get('/me', verifyUser, UserC.getUser);
router.get('/:id', verifyAdmin, UserC.getUser);
router.get('/statistics/new-users', verifyAdmin, UserC.getNewUserCount);
router.put('/reset-password', verifyUser, UserC.resetPassword);
router.put('/', verifyUser, upload.single('avatar'), uploadSingle, UserC.updateUser);
router.delete('/:id', verifyUser, UserC.deleteUser);

module.exports = router;