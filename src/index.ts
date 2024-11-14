// Packages needed for this application:
import inquirer from "inquirer";
import Db from './db/index.js';
import Table from "cli-table3";

const db = new Db();

script();

// Function for all of the prompts that get call in the app:
function script() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What information would you like to access?',
      choices: [
        {
            name: 'View all Departments',
            value: 'VIEW_DEPARTMENTS',
        },
        {
            name: 'View all Roles',
            value: 'VIEW_ROLES',
        },
        {
            name: 'View all Employees',
            value: 'VIEW_EMPLOYEES',
        },
        {
            name: 'Add a Department',
            value: 'ADD_DEPARTMENT',
        },
        {
            name: 'Add a Role',
            value: 'ADD_ROLE',
        },
        {
            name: 'Add an Employee',
            value: 'ADD_EMPLOYEE',
        },
        {
            name: 'Quit Application',
            value: 'QUIT_APPLICATION',
        },
        {
            name: 'Update an Employee',
            value: 'UPDATE_EMPLOYEE'
        }
      ]
    },
])
.then((response) => {
    const choice = response.choice;
//Calls the appropriate function bacsed on the selected prompt in script
    switch (choice) {
        case 'VIEW_DEPARTMENTS':
            findDepartments();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        case 'VIEW_ROLES':
            findRoles();
            break;
        case 'ADD_ROLE':
            addRole();
            break;
        case 'VIEW_EMPLOYEES':
            findEmployees();
            break;
        case 'ADD_EMPLOYEE':
            addEmployee();
            break;
        case 'UDPATE_EMPLOYEE':
            updateEmployee();
            break;
        case 'QUIT_APPLICATION':
            quit();
            break;
        default:
            console.log('Please make another selection');
    }
  });
}

function findDepartments() {
    db.viewAllDepartments()
    .then(({ rows }) => {
        const table = new Table({
            head: ['Department ID', 'Department']
        });
        rows.forEach(row => {
            table.push([row.dept_id, row.dept_name ]);
        });
        console.log(table.toString());
    })
    .then(() => script());
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the department's name?",
        }
    ]).then((response) => {
        db.addDept(response) })
            .then( () => {
                console.log('Your new department was added to the system record!');
            })      
    .then(() => script());
}

function findRoles() {
    db.viewAllRoles()
        .then(({ rows }) => {
            const table = new Table({
                head: ['Role ID', 'Title', 'Salary', 'Department']
            });
            rows.forEach(row => {
                table.push([row.role_id, row.title, row.salary, row.dept_name]);
            });
            console.log(table.toString());
    })
    .then(() => script());
}

async function returnDeptsId() {
    const departments = await db.returnDept()
    return departments.rows.map(row => row.dept_id);
}

async function addRole() {
    const departments = await returnDeptsId();
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "department",
            message: "What is the department ID for this new role?",
            choices: departments
        }
    ]).then((response) => {
        db.addRole(response) })
            .then( () => {
                console.log('Your new role was added to the system record!');
            })      
    .then(() => script());
}

function findEmployees() {
    db.viewAllEmployees()
        .then(({ rows }) => {
            const table = new Table({
                head: ['Employee ID', 'First Name', 'Last Name', 'Title', 'Salary', 'Manager', 'Department']
            });
            rows.forEach(row => {
                table.push([row.employee_id, row.first_name, row.last_name, row.title, row.salary, row.manager, row.dept_name]);
            });
            console.log(table.toString());
        })
        .then(() => script());
}

async function returnRolesId() {
    const roles = await db.returnRole()
    return roles.rows.map(role => role.role_id);
}

async function returnManagers() {
    const managers = await db.returnManager()
    return managers.rows.map(manager => manager.manager)
}

async function addEmployee(){
    const roles = await returnRolesId();
    const managers = await returnManagers();
    const none = 'None';
    inquirer.prompt([
        {
            type: "input",
            name: "fName",
            message: "What is the first name of the employee?",
        },
        {
            type: "input",
            name: "lName",
            message: "What is the last name of the employee?",
        },
        {
            type: "list",
            name: "role",
            message: "What is the role ID for this new employee?",
            choices: roles
        },
        {
            type: "list",
            name: "manager",
            message: "If applicable, who is the manager for this new employee?",
            choices: [...managers, none]
        }
    ]).then((response) => {
        db.addEmp(response) })
            .then( () => {
                console.log('Your new employee was added to the system record!');
            })      
    .then(() => script());
}

async function updateEmployee() {
    
}

function quit () {
    console.log ('Exiting Application');
    process.exit(0);
}