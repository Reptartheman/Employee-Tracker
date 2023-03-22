// This index file contains our SQL connection path to let us connect to the database.
// Using a class called Database, we can use it grab functions from.

// Step 1: Find the information that the user wants from the database
//Step 2: In our MAIN index file, we will need to present said data.

const connection = require('./connection');

class Database{
//this constructor will allow us store our connection to the database to use later on.
    constructor(connection){
        this.connection = connection;
    }
}