const passport = require('passport');

module.exports = {
    localLogin: async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!user) {
                return res.status(400).json({ message: info.message });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }

                return res.status(200).json({ message: 'Logged in' });
            });
        })(req, res, next);
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: 'Logged out' });
        });
    },

    googleLogin: (req, res, next) => {
        passport.authenticate('google', { scope: ['profile']})(req, res, next);
    },

    googleCallback: (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }

            if (!user) {
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.redirect(`${process.env.CLIENT_URL}/login`);
                }

                return res.redirect(process.env.CLIENT_URL);
            });
        })(req, res, next);
    },

    facebookLogin: (req, res, next) => {
        passport.authenticate('facebook')(req, res, next);
    },

    facebookCallback: (req, res, next) => {
        passport.authenticate('facebook', (err, user, info) => {
            if (err) {
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }

            if (!user) {
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.redirect(`${process.env.CLIENT_URL}/login`);
                }

                return res.redirect(process.env.CLIENT_URL);
            });
        })(req, res, next);
    }
};