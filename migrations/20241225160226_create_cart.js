/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS carts (
            cart_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL
        );

        ALTER TABLE carts
        ADD CONSTRAINT fk_carts_users FOREIGN KEY (user_id) REFERENCES users(user_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE carts
    `);
};
