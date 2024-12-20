const passport = require('passport');

module.exports = {
    localLogin: async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(400).send(info.message);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.status(200).json({ message: 'Logged in' });
            });
        })(req, res, next);
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                console.log(err);
            }
            return res.status(200).send('Logged out');
        });
    },

    googleLogin: (req, res, next) => {
        passport.authenticate('google', { scope: ['profile']})(req, res, next);
    },

    googleCallback: (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!user) {
                return res.status(400).send(info.message);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.status(200).json({ message: 'Logged in'});
            });
        })(req, res, next);
    },

    facebookLogin: (req, res, next) => {
        passport.authenticate('facebook')(req, res, next);
    },

    facebookCallback: (req, res, next) => {
        passport.authenticate('facebook', (err, user, info) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!user) {
                return res.status(400).send(info.message);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.status(200).json({ message: 'Logged in' });
            });
        })(req, res, next);
    }
};