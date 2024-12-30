const Transaction = require('../models/transaction.m');
const Account = require('../models/account.m');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const accountId = req.transaction.account_id;
            const balance = await Account.getBalance(accountId);
            if (balance < req.transaction.amount) {
                throw res.status(400).json({message: 'Balance is not enough'});
            }

            const amount = req.transaction.amount;
            await Transaction.createTransaction(accountId, amount);
            return res.status(201).json({message: 'Payment successful'});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
};