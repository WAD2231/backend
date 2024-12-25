const router = require('express').Router();
const UserC = require('../controllers/user.c');

router.get('/', UserC.getUsers);
router.get('/:id', UserC.getUser);
router.post('/', UserC.createUser);
router.put('/:id', UserC.updateUser);
router.delete('/:id', UserC.deleteUser);

module.exports = router;