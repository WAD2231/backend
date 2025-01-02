/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS carts (
            user_id INT,
            product_id INT,
            quantity INT DEFAULT 1
        );

        ALTER TABLE carts
        ADD CONSTRAINT pk_carts PRIMARY KEY (user_id, product_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS carts
    `);
};
