const router = require('express').Router();
const AuthC = require('../controllers/auth.c.js');

router.post('/register', AuthC.register);

router.post('/login/local', AuthC.localLogin);

router.get('/login/google', AuthC.googleLogin);

router.get('/login/google/callback', AuthC.googleCallback);

router.get('/login/facebook', AuthC.facebookLogin);

router.get('/login/facebook/callback', AuthC.facebookCallback);

router.get('/logout', AuthC.logout);

module.exports = router;