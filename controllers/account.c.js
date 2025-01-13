const Account = require('../models/account.m.js');

module.exports = {
    createAccount: async (req, res) => {
        try {
            const account_id = await Account.createAccount();
            res.status(201).json({ account_id });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getBalance: async (req, res) => {
        try {
            const balance = await Account.getBalance(parseInt(req.query.id));
            res.status(200).json({ balance });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};