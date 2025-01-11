/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            total NUMERIC(10, 2),
            status VARCHAR(20) default 'pending',
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INT
        );    
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
