const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}


module.exports = pgp(cn);