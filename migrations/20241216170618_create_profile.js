/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS profile(
            profile_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255),
            user_id INT
        );    

        ALTER TABLE profile
        ADD CONSTRAINT fk_user_profile FOREIGN KEY (user_id) REFERENCES users(user_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        ALTER TABLE profile
        DROP CONSTRAINT fk_user_profile;

        DROP TABLE profile;
    `);
};
