const mysql = require('mysql2');
const inquirer = require("inquirer");
const connection = mysql.createConnection(
    {
        database: 'employees',
        password: 'password',
        user: 'root',      
        host: 'localhost',        
    },
      console.log("\x1b[33m", `Connected to ${process.env.DB_NAME}.`)
    );

    connection.connect(function (err){
        if (err) throw err;
    });

    module.exports = connection;