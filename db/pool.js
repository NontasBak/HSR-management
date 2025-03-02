const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: "localhost",
  user: process.env.ROLE_NAME,
  database: "hsr_management",
  password: process.env.ROLE_PASSWORD,
  port: 5432
});
