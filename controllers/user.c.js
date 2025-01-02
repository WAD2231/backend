const User = require('../models/user.m.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.getUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.getUserDetail(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            // Check if email already exists
            const emailExists = await User.getUser('email', user.email);
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Check if username already exists
            const usernameExists = await User.getUser('username', user.username);
            if (usernameExists) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword

            // Create account in sub-system
            const token = jwt.sign({}, priKey, { algorithm: 'RS256' });
            const response = await fetch(`https://localhost:${process.env.EPAY_PORT}/api/accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token})
            });
            const result = await response.json();
            user.account_id = result.account_id;

            const newUser = await User.createUser(user);
            return res.status(201).json(newUser);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.getUser('user_id', id);

            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if email already exists
            if (req.body.email) {
                const emailExists = await User.getUser('email', req.body.email);
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                user.email = req.body.email;
            }

            // Hash password (if provided)
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                user.password = hashedPassword;
            }

            const updatedUser = await User.updateUser(id, user);
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const rowsAffected = await User.deleteUser(id);

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(204);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },

    getNewUserCount: async (req, res) => {
        try {
            const newUsers = await User.getUserCount();
            return res.status(200).json(newUsers);
        }
        catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
};