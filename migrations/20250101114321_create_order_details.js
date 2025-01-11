/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS order_details (
            order_detail_id SERIAL PRIMARY KEY,
            product_id INT,
            quantity INT,
            subtotal NUMERIC(10, 2),
            order_id INT
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS order_details;
    `);
};
