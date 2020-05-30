const mysql = require('mysql');

// Database Credentials and Settings
const dbSettings = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10
}

const connection = mysql.createConnection(dbSettings);

connection.connect(function (err) {
  if (err) {
    return console.error(`Unable to connect to database ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  }
  console.log(`Connected to the MySQL server at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});

const pool = mysql.createPool(dbSettings);

module.exports = pool;
