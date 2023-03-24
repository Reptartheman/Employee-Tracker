// This index file contains our SQL connection path to let us connect to the database.
// Using a class called Database, we can use it grab functions from.

// Step 1: Find the information that the user wants from the database
//Step 2: In our MAIN index file, we will need to present said data.

const connection = require("./connection");

class Database {
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

  //  We first will searchEmployees
  // We are going to find the employees, then join that with the matching information on roles and then join that with department.

  searchEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
  // searching employees by their manager by passing the manager_id as a parameter.
  searchEmployeesByMngr(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }
  // searching for employee by department
  searchEmployeesByDepartment(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }
  // The question mark in the query is saying "get all the employees except the one that the user has selected"
  // They can't be their own manager
  searchPossibleMngrs(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee where id != ?",
        employeeId
      );
  }
  // search for the departments and provide id and name
  searchAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  //the searchAllRoles function will return all the roles and join them with the department. This is because of the many to many relationship in the query above. The dot notation will filter down the tables and give the data we want.

  searchAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",
        employeeId
      );
  }

// Views all of the departments and sums up their budgets
  departmentBudgetData() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
      );

  }
// This function has two parameters.
  // 1. Will be our designated employee.
  //2. Will be our new role id.
//SET: Will update our employee table.
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
    .promise()
    .query("UPDATE employee SET role_id = ? WHERE id = ?", [
      roleId,
      employeeId,
    ]); 
  }
// Two parameters again...
  // 1. The employee we are trying to access.
  //2. New manager we are trying to update.
  updateEmployeeManager(employeeId, managerId) {
    return this.connection
    .promise()
    .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
      employeeId,
      managerId,
    ]);
  }

// This one will let us add an employee to the employee table.
  addEmployee(employee) {
    return this.connection
    .promise()
    .query("INSERT INTO employee SET ?", employee);
  }

// This function is grabbing our connection. The promise is fulfilling that statement and once it does that it will query the new data into the database.
  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
// Same as above except that we are adding a new department.
  addDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);

  }
// This is deleting an employee with a WHERE clause that says "Hey, only do this if the id matches."
  deleteEmployee(employeeId) {
    return this.connection.promise().query("DELETE FROM employee WHERE id = ?", employeeId);

  }
// This is deleting a role with a WHERE clause that says "Hey, only do this if the role Id matches."
  deleteRole(roleId) {
    return this.connection
    .promise()
    .query("DELETE FROM role WHERE id = ?", roleId);

  }
// This is deleting a department from the department table.
  deleteDepartment(departmentId) {
    return this.connection
    .promise()
    .query("DELETE FROM department WHERE id = ?", departmentId);
  }
} 

module.exports = new Database(connection);