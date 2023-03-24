// The following variables are global and will import all of the modules we need.

const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
// The database variable has our connection file that includes the mysql package and connection.
// It also stores our functions for the SQL queries.
const dataBase = require("./db");
const cTabel = require("console.table");

startApp();

function startApp() {
  const logoText = logo({ name: "Employee Tracker" }).render();
  console.log(logoText);
  startPrompts();
}

function startPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Make a selection from the choices listed below",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees by Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((answer) => {
    let choice = answer.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeMangager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      default:
        quit();
    }
  });
}

// This function is called in the case that user selects 'VIEW_EMPLOYEES'
// Within it we use .then() to pass the queried result as an array.
// After that, the 'rows' result will be reassigned to the employees variable.
// Add a line break.
// Then we view the employees in the table.

function viewEmployees() {
  dataBase
    .searchEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startPrompts);
}
// The function below shows which employees work under certain managers.
// Same concept as the first function, however...
// 1. We are using a constant with .map() to return a new array.
// 2. Within the .map() method and we are going to pass an object as our parameter.
// 3. As we return the parameters using template literals, we are going to access the data we stored in the managers variable.
// 4. We then come up with a set of prompts using inquirer that asks the user which employee they want to see reports for.
//4a. The choices are stored in const = managerChoices.
// 5. The first .then() is querying our database that lets us find employees by manager.
// 6. The data then gets displayed.
// 7. The 'if statement' checks to see if the data passes. If it doesn't the console logs that message.
function viewEmployeesByManager() {
  dataBase.searchEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Select a manager to view the employees witin their department",
        choices: managerChoices,
      },
    ])
      .then((res) => dataBase.searchEmployeesByMngr(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log(
            "The selected manager has no direct employees working under them."
          );
        } else {
          console.table(employees);
        }
      })
      .then(() => startPrompts());
  });
}
// Similar process as above, except that we are showing what employees work in what department.
function viewEmployeesByDepartment() {
  dataBase.searchAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices,
      },
    ])
      .then((res) => dataBase.searchEmployeesByDepartment(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => startPrompts());
  });
}

function viewRoles() {
  dataBase
    .searchAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startPrompts());
}


