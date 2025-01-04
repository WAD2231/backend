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

router.get('/', ProfileC.getProfiles);

router.get('/:id', ProfileC.getProfile);

router.post('/', upload.single('avatar'), ProfileC.createProfile);

router.put('/:id', upload.single('avatar'), ProfileC.updateProfile);

router.delete('/:id', ProfileC.deleteProfile);

module.exports = router;