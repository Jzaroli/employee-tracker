"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages needed for this application:
const inquirer_1 = __importDefault(require("inquirer"));
const index_js_1 = __importDefault(require("./db/index.js"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const db = new index_js_1.default();
script();
// Function for all of the prompts that get call in the app:
function script() {
    inquirer_1.default
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
                    name: 'Add an Employee',
                    value: 'ADD_EMPLOYEE',
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
        const table = new cli_table3_1.default({
            head: ['Department ID', 'Department']
        });
        rows.forEach(row => {
            table.push([row.dept_id, row.dept_name]);
        });
        console.log(table.toString());
    })
        .then(() => script());
}
function addDepartment() {
    inquirer_1.default.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the department's name?",
        }
    ]).then((response) => {
        db.addDept(response);
    })
        .then(() => {
        console.log('Your new department was added to the system record!');
    })
        .then(() => script());
}
function findRoles() {
    db.viewAllRoles()
        .then(({ rows }) => {
        const table = new cli_table3_1.default({
            head: ['Role ID', 'Title', 'Salary', 'Department']
        });
        rows.forEach(row => {
            table.push([row.role_id, row.title, row.salary, row.dept_name]);
        });
        console.log(table.toString());
    })
        .then(() => script());
}
function addRole() {
    inquirer_1.default.prompt([
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
            type: "input",
            name: "department",
            message: "What is the department ID of the role? For a list of IDs, select view all departments:",
        }
    ]).then((response) => {
        db.addRole(response);
    })
        .then(() => {
        console.log('Your new role was added to the system record!');
    })
        .then(() => script());
}
function findEmployees() {
    db.viewAllEmployees()
        .then(({ rows }) => {
        const table = new cli_table3_1.default({
            head: ['Employee ID', 'First Name', 'Last Name', 'Title', 'Salary', 'Manager', 'Department']
        });
        rows.forEach(row => {
            table.push([row.employee_id, row.first_name, row.last_name, row.title, row.salary, row.manager, row.dept_name]);
        });
        console.log(table.toString());
    })
        .then(() => script());
}
function addEmployee() {
    inquirer_1.default.prompt([
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
            type: "input",
            name: "roleId",
            message: "What is the role ID of the employee? For a list of IDs, select view all roles:",
        },
        {
            type: "input",
            name: "managerID",
            message: "If applicable, what is the manager ID for this employee? For existing manager IDs, select view all employees:",
        }
    ]).then((response) => {
        db.addEmp(response);
    })
        .then(() => {
        console.log('Your new employee was added to the system record!');
    })
        .then(() => script());
}
function quit() {
    console.log('Exiting Application');
    process.exit(0);
}
