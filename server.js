require("dotenv").config();
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
require("console.table");

// create the connection to database via env
const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

// this function will prompt choises and based on the user answers
// another funtion will be called
const promptChoises = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((userAnswer) => {
      switch (userAnswer.menu) {
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateRole();
          break;
        default:
          process.exit();
      }
    });
};

// this function will select all departments
const viewDepartments = () => {
  connection.query("SELECT * FROM department;", (err, results) => {
    console.table(results);
    promptChoises();
  });
};

// this function will select all roles
const viewRoles = () => {
  connection.query("SELECT * FROM role;", (err, results) => {
    console.table(results);
    promptChoises();
  });
};

// this function will show all employees
const viewEmployees = () => {
  connection.query("SELECT * FROM employee;", (err, results) => {
    console.table(results);
    promptChoises();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the department name you would like to add",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter the name of a department!");
            return false;
          }
        },
      },
    ])
    .then((name) => {
      connection.promise().query("INSERT INTO department SET ?", name);
      viewDepartments();
    });
};

const addRole = () => {
  return connection
    .promise()
    .query("SELECT department.id, department.name FROM department;")
    .then(([departments]) => {
      let departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "Enter the name of your ROLE",
            validate: (roleName) => {
              if (roleName) {
                return true;
              } else {
                console.log("Please enter your ROLE name!");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department",
            message: "Which department are you from?",
            choices: departmentChoices,
          },
          {
            type: "input",
            name: "salary",
            message: "Please Enter your salary ",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("Please enter your salary!");
                return false;
              }
            },
          },
        ])
        .then(({ title, department, salary }) => {
          const query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: title,
              department_id: department,
              salary: salary,
            },
            function (err, res) {
              if (err) throw err;
            }
          );
        })
        .then(() => viewRoles());
    });
};

const addEmployee = (roles) => {
  return connection
    .promise()
    .query("SELECT R.id, R.title FROM role R;")
    .then(([employees]) => {
      let titleChoices = employees.map(({ id, title }) => ({
        value: id,
        name: title,
      }));

      connection
        .promise()
        .query(
          "SELECT E.id, CONCAT(E.first_name,' ',E.last_name) AS manager FROM employee E;"
        )
        .then(([managers]) => {
          let managerChoices = managers.map(({ id, manager }) => ({
            value: id,
            name: manager,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employees first name",
                validate: (firstName) => {
                  if (firstName) {
                    return true;
                  } else {
                    console.log("Please enter the employees first name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employees last name ",
                validate: (lastName) => {
                  if (lastName) {
                    return true;
                  } else {
                    console.log("Please enter the employees last name!");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "role",
                message: "What is the employees role?",
                choices: titleChoices,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employees manager?",
                choices: managerChoices,
              },
            ])
            .then(({ firstName, lastName, role, manager }) => {
              const query = connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: role,
                  manager_id: manager,
                },
                function (err, res) {
                  if (err) throw err;
                  console.log({ role, manager });
                }
              );
            })
            .then(() => viewEmployees());
        });
    });
};

const updateRole = () => {
  return connection
    .promise()
    .query("SELECT ROLE.id, R.title, R.salary, R.department_id FROM role R;")
    .then(([roles]) => {
      let roleChoices = roles.map(({ id, title }) => ({
        value: id,
        name: title,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "Which role do you want to update?",
            choices: roleChoices,
          },
        ])
        .then((role) => {
          console.log(role);
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Please enter the name of your title ",
                validate: (roleName) => {
                  if (roleName) {
                    return true;
                  } else {
                    console.log("Please enter your title name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "salary",
                message: "Enter your salary",
                validate: (salary) => {
                  if (salary) {
                    return true;
                  } else {
                    console.log("Please enter your salary!");
                    return false;
                  }
                },
              },
            ])
            .then(({ title, salary }) => {
              const query = connection.query(
                "UPDATE role SET title = ?, salary = ? WHERE id = ?",
                [title, salary, role.role],
                function (err, res) {
                  if (err) throw err;
                }
              );
            })
            .then(() => promptChoises());
        });
    });
};

promptChoises();
