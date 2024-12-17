const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user.m.js');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await User.getUserByUsername(username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/login/google/callback'
    },
        async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOrCreateUserByGoogle(profile);
            return cb(null, user);
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/api/auth/login/facebook/callback"
    },
        async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOrCreateUserByFacebook(profile);
            return cb(null, user);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.getUser(id);
            done(null, user);
        }
        catch (error) {
            done(error, null);
        }
    });
}