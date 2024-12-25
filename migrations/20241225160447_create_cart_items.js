/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS cart_items (
            item_id SERIAL PRIMARY KEY,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            cart_id INT NOT NULL
        );    

        ALTER TABLE cart_items
        ADD CONSTRAINT fk_items_carts FOREIGN KEY (cart_id) REFERENCES carts(cart_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE cart_items
    `);
};
