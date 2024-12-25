const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    createCart: async (userID) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.carts (user_id) 
                VALUES ($1) RETURNING *
            `;
            const result = await db.one(query, [userID]);
            return result;
        }
        catch (err) {
            throw err;
        }
    },

    getCart: async (userID) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.carts 
                WHERE user_id = $1
            `;
            const result = await db.oneOrNone(query, [userID]);
            return result.cart_id;
        }
        catch (err) {
            throw err;
        }
    },

    getItems: async (userID) => {
        try {
            const query = `
                SELECT 
                    c.cart_id,
                    c.user_id,
                    json_agg(
                        json_build_object(
                            'item_id', i.item_id,
                            'product_id', i.product_id,
                            'quantity', i.quantity,
                            'name', p.name,
                            'price', p.price,
                            'stock', p.stock
                        )
                    ) as items
                FROM ${SCHEMA}.carts c
                JOIN ${SCHEMA}.cart_items i ON c.id = i.cart_id
                JOIN ${SCHEMA}.products p ON i.product_id = p.product_id
                WHERE c.user_id = $1
            `;
            const result = await db.oneOrNone(query, [userID]);
            return result;
        }
        catch (err) {
            throw err;
        }
    },

    addItem: async (cartID, productID) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.cart_items (cart_id, product_id, quantity) 
                VALUES ($1, $2, $3) RETURNING *
            `;
            const result = await db.one(query, [cartID, productID, 1]);
            return result;
        }
        catch (err) {
            throw err;
        }
    },

    deleteItem: async (cartID, productID) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.cart_items 
                WHERE cart_id = $1 AND product_id = $2
            `;
            await db.none(query, [cartID, productID]);
        }
        catch (err) {
            throw err;
        }
    },

    updateItem: async (cartID, productID, quantity) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.cart_items 
                SET quantity = $3 
                WHERE cart_id = $1 AND product_id = $2
                RETURNING *
            `;
            const result = await db.one(query, [cartID, productID, quantity]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
};