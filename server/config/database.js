const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "nails_lashes",
    user: "postgres",
    password: "Webkontra1"
});

module.exports = pool;