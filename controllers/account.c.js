const Account = require('../models/account.m.js');

module.exports = {
    createAccount: async (req, res) => {
        try {
            const account_id = await Account.createAccount();
            res.status(201).json({ id: account_id });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};