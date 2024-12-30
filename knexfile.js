require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
};
