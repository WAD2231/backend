const Transaction = require('../models/transaction.m');
const Account = require('../models/account.m');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const accountID = req.transaction.account_id;
            const balance = await Account.getBalance(accountID);
            if (balance < req.transaction.amount) {
                throw res.status(400).json({message: 'Balance is not enough'});
            }
            const amount = req.transaction.amount;
            const orderID = req.transaction.order_id
            await Transaction.createTransaction(accountID, amount, orderID);
            return res.status(201).json({message: 'Payment successful'});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
};