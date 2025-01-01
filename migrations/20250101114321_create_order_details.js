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
            subtotal BIGINT,
            order_id INT
        );

        ALTER TABLE order_details
        ADD CONSTRAINT fk_details_orders FOREIGN KEY (order_id) REFERENCES orders(order_id);
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
