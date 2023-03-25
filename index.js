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
        viewDepartmentBudget();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        changeManager();
        break;
      case "ADD_EMPLOYEE":
        createEmployee();
        break;
      case "ADD_ROLE":
        createRole();
        break;
      case "ADD_DEPARTMENT":
        createDepartment();
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
        closeApp();
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

function viewDepartments() {
  dataBase
    .searchAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startPrompts());
}

function viewDepartmentBudget() {
  dataBase
    .departmentBudgetData()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startPrompts());
}

/*  The following function will update the employee role with similar logic from the functions above.
 When we first run the query, we are calling the searchEmployees function from the index file in the database folder.

 This function call then stores the data from that call in an array. Tehn we store in the employees variable.
 The employeeChoices variable is then turning those answers into a new array using the .map() method.
    - In this method we are passing an object as the parameter, which returns that data as a new object with template literals so that
    the data from our first query will appear.

    We then use inquirer which displays the prompts.
    The answers from those prompts are stored in the employeeChoices variable.
    There is then a second part chanined to this with a response...
    That response is the employeeId stored in the employeeId variable.
    We then run a query with searchAllRoles function and then...
    Pass that result as an array.
    The roles variable will store that result in which we then make the roleChoices variable and 
    use the .map() method which allows us to make a new array.

    We run inquirer again to ask the user questions based on our stored variable from the code block above it.
    We'll then query our dataBase file and pass the employeeId and the roleId as parameters.
 */
function updateEmployeeRole() {
  dataBase.searchEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      dataBase.searchAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: `${title}`,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => dataBase.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Updated employee's role"))
          .then(() => startPrompts());
      });
    });
  });
}
// Same logic as above, but now we are changing the manager.
function changeManager() {
  dataBase.searchEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      dataBase.searchPossibleMngrs(employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          })
        );
        prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices,
          },
        ])
          .then((res) =>
            dataBase.updateEmployeeManager(employeeId, res.managerId)
          )
          .then(() => console.log("Updated employee's manager"))
          .then(() => startPrompts());
      });
    });
  });
}

/* This next function will allow the user to add an employee, taking into account that employees
have different roles.
    ** LINES 373 TO 387 **
    - First start with the inquirer prompt asking the first and last name of the employee.
    - Then the results will get stored into some variables.
    - The data from those variables will be used in the 3rd to last .then() call found below.
    ** LINES 388 TO 398 **
    - We will then access the database to find all of the roles.
    - .map() gets used on the results from that query to show the results of those choices in the next inquirer prompt.
    ** LINES 399 TO 409 **
    - Next, we will use the users answers and store it as a variable BEFORE the next query to find all of the employees.
    - We then use .map() again on our previous results and then use .unshift() to add the values to the beginning of the array.
    ** LINES 410 TO 428 **
    - After that we will run another prompt to ask who the employees manager is.
    - Those answers get stored in a variable and then we pass that variable to the into our addEmployee() function.

*/

function createEmployee() {
  prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employees first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employees last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    dataBase.searchAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "Enter the employees role",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;
        dataBase.searchEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );
          managerChoices.unshift({ name: "None", value: null });
          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };
              dataBase.addEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => startPrompts());
        });
      });
    });
  });
}
/*  This function adds the roles to the database 
  - The first thing we do is query the database by searching all departments.
  - Then we took the result of that query, stored it in an array and then gave it a variable.
  - Then we provided the necessary prompts for the user to answer.
  - Within the last prompt we are using the information we in store in the 'departmentChoices' variable as a value within the last object in our prompt.
  - Those results get used in the addRole() query.
*/
function createRole() {
  dataBase.searchAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "input",
        name: "title",
        message: "Please provide a name for the role",
      },
      {
        type: "input",
        name: "salary",
        message: "Please provide a salary for the role",
      },
      {
        type: "list",
        name: "department_id",
        message: "Please provide a department that this role belongs to",
        choices: departmentChoices,
      },
    ]).then((role) => {
      dataBase
        .addRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => startPrompts());
    });
  });
}

function createDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "Please provide a name for the department",
    },
  ]).then((res) => {
    let name = res;
    dataBase
      .addDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => startPrompts());
  });
}

/* Function to remove an employee

  - We need to query the database to search for our employees.
  - That result will get stores in variable and then we will .map() to return a new array which is where the answers will be stored.
  - All of that data will get stored into a variable which will then represent our choices when we want to answer the inquirer prompt

*/

function removeEmployee() {
  dataBase.searchEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select an employee to remove from the database",
        choices: employeeChoices,
      },
    ])
      .then((res) => dataBase.deleteEmployee(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => startPrompts());
  });
}

/* This next function will remove a role from the database */

function removeRole() {
  dataBase.searchAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({id, title }) => ({
      name: title,
      value: id
    }));
    prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Please select a role to remove from the database',
        choices: roleChoices
      },
    ])
    ((res)=> dataBase.deleteRole(res.roleId))
    .then(() => console.log("Removed role from the database"))
    .then(() => startPrompts());
  })
}


function removeDepartment() {
  dataBase.searchAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id , name }) => ({
      name: name,
      value: id
    }));
    prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Please select a department to remove from the database',
        choices: departmentChoices
      },
    ])
    ((res)=> dataBase.deleteDepartment(res.departmentId))
    .then(() => console.log("Removed department from the database"))
    .then(() => startPrompts());
  });
};


function closeApp() {
  console.log('Process completed successfully')
  process.exit();
}