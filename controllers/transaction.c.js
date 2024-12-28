const Transaction = require('../models/transaction.m');
const Account = require('../models/account.m');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const accountId = req.body.account_id;
            const balance = await Account.getBalance(accountId);
            if (balance < req.body.amount) {
                throw res.status(400).send('Balance is not enough');
            }

            const amount = req.body.amount;
            await Transaction.createTransaction(accountId, amount);
            res.status(201).send('Payment successful');
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};