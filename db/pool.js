const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: "localhost",
  user: process.env.ROLE_USER,
  database: "top_users",
  password: process.env.ROLE_PASSWORD,
  port: 5432
});
