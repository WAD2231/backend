/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            total bigint,
            status VARCHAR(20) default 'pending',
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INT
        );    

        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(user_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS orders
    `);
};
