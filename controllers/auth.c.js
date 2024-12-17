const User = require('../models/user.m.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const USER = process.env.PERMISSION_USER;
const ADMIN = process.env.PERMISSION_ADMIN;

module.exports = {
    register: async (req, res) => {
        try {
            // Check if username already exists
            const existedUsername = await User.getUserByUsername(req.body.username);
            if (existedUsername) {
                return res.status(400).send('Username already exists');
            }

            // Check if email already exists
            const existedEmail = await User.getUserByEmail(req.body.email);
            if (existedEmail) {
                return res.status(400).send('Email already exists');
            }

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create user
            const user = req.body;
            user.password = hashedPassword;
            const user_id = await User.createUser(user);
            return res.status(201).json({ user_id });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    },

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

                return res.status(200).json({ user_id: user.user_id });
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

                return res.status(200).json({ user_id: user.user_id });
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

                return res.status(200).json({ user_id: user.user_id });
            });
        })(req, res, next);
    }
};