const User = require('../models/user.m.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 10;
            const users = await User.getUsers(page, size);
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id) || req.user.user_id;
            const user = await User.getUserDetail(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

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
            user.permission = process.env.PERMISSION_USER;

            const newUser = await User.createUser(user);
            return res.status(201).json({ user_id: newUser });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const id = req.user.user_id;
            const user = await User.getUser('user_id', id);

            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.login_provider !== process.env.LOCAL) {
                return res.status(400).json({ message: 'Password reset only available for local accounts' });
            }

            // Hash password (if provided)
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                user.password = hashedPassword;
            }

            await User.resetPassword(id, user.password);
            return res.status(200).json({ message: 'Password reset successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const effectedRows = await User.deleteUser(id);
            if (effectedRows === 0) {
                return res.status(400).json({ message: 'User not found'});
            }
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
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
    },

    updateUser: async (req, res) => {
        try {
            const id = req.user.user_id;
            const effectedRows = await User.updateUser(id, req.body);
            if (effectedRows === 0) {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};