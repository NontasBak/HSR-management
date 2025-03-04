const { Pool } = require("pg");
const { dbConfig } = require("./config");

module.exports = new Pool(dbConfig);
