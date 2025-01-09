const router = require('express').Router();
const UserC = require('../controllers/user.c');
const {verifyUser, verifyAdmin} = require('../middlewares/authorize');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('/', UserC.createUser);
router.get('/', verifyAdmin, UserC.getUsers);
router.get('/me', verifyUser, UserC.getUser);
router.get('/:id', verifyAdmin, UserC.getUser);
router.get('/statistics/new-users', verifyAdmin, UserC.getNewUserCount);
router.put('/reset-password', verifyUser, UserC.resetPassword);
router.put('/', verifyUser, upload.single('avatar'), UserC.updateUser);
router.delete('/:id', verifyUser, UserC.deleteUser);

module.exports = router;