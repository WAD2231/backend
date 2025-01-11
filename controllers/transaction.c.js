const Transaction = require('../models/transaction.m');
const Account = require('../models/account.m');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const accountID = req.transaction.account_id;
            const balance = await Account.getBalance(accountID);
            if (balance < req.transaction.amount) {
                return res.status(400).json({message: 'Balance is not enough'});
            }
            const amount = req.transaction.amount;
            const orderID = req.transaction.order_id
            await Transaction.createTransaction(accountID, amount, orderID);
            return res.status(201).json({message: 'Payment successful'});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    reconcileTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.getTransaction(req.transaction.order_id);
            if (transaction) {
                return res.status(200).json({message: 'Transaction reconciled.'})
            }

            return res.status(404).json({message: 'Transaction not found.'});
        }
        catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
};