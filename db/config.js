require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

const localConfig = {
    host: "localhost",
    user: process.env.ROLE_NAME,
    database: "hsr_management",
    password: process.env.ROLE_PASSWORD,
    port: 5432
};

const neonConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
};

module.exports = {
    dbConfig: isDevelopment ? localConfig : neonConfig
};