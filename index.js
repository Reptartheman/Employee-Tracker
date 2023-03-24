// The following variables are global and will import all of the modules we need.

const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
// The database variable has our connection file that includes the mysql package and connection.
// It also stores our functions for the SQL queries.
const dataBase = require('./db');
const cTabel = require('console.table');


startApp();

function startApp() {
    const logoText = logo({ name: 'Employee Tracker'}).render();
    console.log(logoText);
    startPrompts();
};

function startPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Make a selection from the choices listed below',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Employees by Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View Total Utilized Budget By Department',
                    value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                  },
                  {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT'
                  },
                  {
                    name: 'Quit',
                    value: 'QUIT'
                  }
            ]
        }
    ]).then( answer => {
        let choice = answer.choice;
        switch (choice) {
          case 'VIEW_EMPLOYEES':
            viewEmployees();
            break;
          case 'VIEW_EMPLOYEES_BY_MANAGER':
            viewEmployeesByManager();
            break;
          case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
            viewEmployeesByDepartment();
            break;
          case 'VIEW_ROLES':
            viewRoles();
            break;
          case 'VIEW_DEPARTMENTS':
            viewDepartments();
            break;
          case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
            viewUtilizedBudgetByDepartment();
            break;
          case 'UPDATE_EMPLOYEE_ROLE':
            updateEmployeeRole();
            break;
          case 'UPDATE_EMPLOYEE_MANAGER':
            updateEmployeeMangager();
            break;
          case 'ADD_EMPLOYEE':
            addEmployee();
            break;
          case 'ADD_ROLE':
            addRole();
            break;
          case 'ADD_DEPARTMENT':
            addDepartment();
            break;
          case 'REMOVE_EMPLOYEE':
            removeEmployee();
            break;
          case 'REMOVE_ROLE':
            removeRole();
            break;
          case 'REMOVE_DEPARTMENT':
            removeDepartment();
            break;
          default:
            quit();      
        }
      })
}

// This function is called in the case that user selects 'VIEW_EMPLOYEES'
// Within it we use .then() to pass the queried result as an array.
// After that, the 'rows' result will be reassigned to the employees variable.
// Add a line break.
// Then we view the employees in the table.

function viewEmployees() {
    dataBase.searchEmployees().then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    }).then(() => startPrompts)
}



