/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS users(
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(40),
            password VARCHAR(255),
            email VARCHAR(255),
            permission INT NOT NULL,
            login_provider INT,
            provider_id VARCHAR(255),
            wallet_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )    
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE user
    `);
};
