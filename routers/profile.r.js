const router = require('express').Router();
const ProfileC = require('../controllers/profile.c');

router.get('/:id', ProfileC.getProfile);

router.post('/', ProfileC.createProfile);

router.put('/:id', ProfileC.updateProfile);

router.delete('/:id', ProfileC.deleteProfile);

module.exports = router;