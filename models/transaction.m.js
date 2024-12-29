const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;
const mainID = 1;

module.exports = {
    createTransaction: async (accountId, amount) => {
        db.tx(async t => {
            try {
                const transactionID = await t.one(`
                    INSERT INTO ${SCHEMA}.transactions (account_id, amount)
                    VALUES ($1, $2)
                    RETURNING transaction_id
                `, [accountId, amount]);
            
                await t.none(`
                    UPDATE ${SCHEMA}.accounts
                    SET balance = balance + $1
                    WHERE account_id = $2
                `, [amount, mainID]);
            
                await t.none(`
                    UPDATE ${SCHEMA}.accounts
                    SET balance = balance - $1
                    WHERE account_id = $2
                `, [amount, accountId]);

                await t.none(`
                    UPDATE ${SCHEMA}.transactions
                    SET status = 'completed'
                    WHERE transaction_id = $1    
                `, [transactionID.transaction_id]);        
            
            } catch (error) {
                throw error; 
            }
        })
        .catch(error => {
            throw error;
        });       
    },
};