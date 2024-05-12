const mysql = require("mysql2/promise")
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.getConnection()
    .then(connection => {
        console.log('Connection to the database established successfully.');
        connection.release(); // Release the connection
    })
    .catch(error => {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with an error status
    });

module.exports = pool
