// This index file contains our SQL connection path to let us connect to the database.
// Using a class called Database, we can use it grab functions from.

// Step 1: Find the information that the user wants from the database
//Step 2: In our MAIN index file, we will need to present said data.

const connection = require('./connection');

class Database{
//this constructor will allow us store our connection to the database to use later on.
    constructor(connection) {
        this.connection = connection;
    }
// this connection will be allow us to connect to the viewEmployees function in our main index file.
    // We are also going to use this connection to chain other methods to it
    // .promise() returns a promise that is resolved when all actions are done
    // .query() will receive the SQL input and return the results as the output.

// the dot notation in the query will get the data stored under the column names.
// CONCAT: will join the two columns together
// AS: will rename the columns.
// LEFT JOIN: Everything on the left table that matches anything on the right table will be joined.

//  We first will findAllEmployees
// We are going to find the employees, then join that with the matching information on roles and then join that with department.

findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
    
}