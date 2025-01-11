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
            permission INT NOT NULL,
            login_provider INT,
            provider_id VARCHAR(255),
            account_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fullname VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255),
            avatar TEXT DEFAULT 'https://th.bing.com/th/id/OIP.P8F796BGNue4Lu2SImT1bgAAAA?rs=1&pid=ImgDetMain'
        );
        
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE users
    `);
};
