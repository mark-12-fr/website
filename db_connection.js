const mysql = require("mysql");

const db_connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"website_db"
});

module.exports = db_connection;


