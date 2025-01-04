const router = require('express').Router();
const ProfileC = require('../controllers/profile.c');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage: storage })
const {verifyUser} = require('../middlewares/authorize');

router.get('/', verifyUser, ProfileC.getProfiles);

router.get('/me', verifyUser, ProfileC.getMyProfile);

router.get('/:id', verifyUser, ProfileC.getProfile);

router.post('/', verifyUser, upload.single('avatar'), ProfileC.createProfile);

router.put('/:id', verifyUser, upload.single('avatar'), ProfileC.updateProfile);

router.delete('/:id', verifyUser, ProfileC.deleteProfile);

module.exports = router;