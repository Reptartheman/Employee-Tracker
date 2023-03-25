const mysql = require('mysql2');
const inquirer = require("inquirer");
const env = require("dotenv").config();
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,      
    },
      console.log("\x1b[33m", `Connected to ${process.env.DB_NAME}.`)
    );

    connection.connect(function (err){
        if (err) throw err;
    });

    module.exports = connection;