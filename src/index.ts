// Packages needed for this application:
import inquirer from "inquirer";
import Db from './db/index.js';

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
            name: 'View all Employess',
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
            name: 'Quit Application',
            value: 'QUIT_APPLICATION',
        }
      ]
    },
])
.then((response) => {
    const choice = response.choice;
//Calls the appropriate function bacsed on the selected prompt in script
    switch (choice) {
        case 'VIEW_EMPLOYEES':
            findEmployees();
            break;
        case 'VIEW_DEPARTMENTS':
            findDepartments();
            break;
        case 'VIEW_ROLES':
            findRoles();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        case 'ADD_ROLE':
            AddRole();
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
        const departments = rows;
        console.table(departments);
    })
    .then(() => script());
}

function findEmployees() {
    db.viewAllEmployees()
        .then(({ rows }) => {
            const employees = rows;
            console.table(employees);
        })
        .then(() => script());
}

function findRoles() {
    db.viewAllRoles()
        .then(({ rows }) => {
            const roles = rows; 
            console.table(roles);
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

function quit () {
    console.log ('Exiting Application');
    process.exit(0);
}