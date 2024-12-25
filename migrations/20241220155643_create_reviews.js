/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS reviews (
            review_id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            rating INTEGER NOT NULL,
            posted_at TIMESTAMP DEFAULT NOW(),
            product_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL
        );    
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS reviews;
    `);
};
