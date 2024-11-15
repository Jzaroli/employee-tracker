"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages needed for this application:
const inquirer_1 = __importDefault(require("inquirer"));
const index_js_1 = __importDefault(require("./db/index.js"));
const cli_table3_1 = __importDefault(require("cli-table3"));
// Creates Db instance:
const db = new index_js_1.default();
// Runs main script when booting up the app:
script();
// Function with the prompts that make up the app:
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
                    name: 'Update an Employee',
                    value: 'UPDATE_EMPLOYEE'
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
        //Calls the appropriate function based on the selected prompt in the script:
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
            case 'UPDATE_EMPLOYEE':
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
// Function that connects script() to the queries in db/index.js for viewing departments
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
// Function that connects script() to the queries in db/index.js for adding departments
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
// Function that connects script() to the queries in db/index.js for viewing roles:
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
// Async function that returns departments to populate in addRole():
function returnDeptsId() {
    return __awaiter(this, void 0, void 0, function* () {
        const departments = yield db.returnDept();
        return departments.rows.map(row => row.dept_id);
    });
}
// Function that connects script() to the queries in db/index.js for adding roles:
function addRole() {
    return __awaiter(this, void 0, void 0, function* () {
        const departments = yield returnDeptsId();
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
                type: "list",
                name: "department",
                message: "What is the department ID for this new role?",
                choices: departments
            }
        ]).then((response) => {
            db.addRole(response);
        })
            .then(() => {
            console.log('Your new role was added to the system record!');
        })
            .then(() => script());
    });
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
// Async function that returns roles to populate in addEmployee():
function returnRolesId() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield db.returnRole();
        return roles.rows.map(role => role.role_id);
    });
}
// Async function that returns managers to populate in addEmployee():
function returnManagers() {
    return __awaiter(this, void 0, void 0, function* () {
        const managers = yield db.returnManager();
        return managers.rows.map(manager => manager.manager);
    });
}
// Function that connects script() to the queries in db/index.js for adding employees:
function addEmployee() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield returnRolesId();
        const managers = yield returnManagers();
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
                type: "list",
                name: "role",
                message: "What is the role ID for this new employee?",
                choices: roles
            },
            {
                type: "list",
                name: "manager",
                message: "If applicable, who is the manager for this new employee?",
                choices: [...managers, 'None']
            }
        ]).then((response) => {
            db.addEmp(response);
        })
            .then(() => {
            console.log('Your new employee was added to the system record!');
        })
            .then(() => script());
    });
}
// Async function that returns the employees and their IDs as a string for updateEmployee():
function returnExistingEmpsName() {
    return __awaiter(this, void 0, void 0, function* () {
        const employees = yield db.returnExistEmps();
        return employees.rows.map(employee => `${employee.employee_id} ${employee.first_name} ${employee.last_name}`);
    });
}
// Function that connects script() to the queries in db/index.js for updating employees:
function updateEmployee() {
    return __awaiter(this, void 0, void 0, function* () {
        // Stores employee information for initial employee selection:
        const employees = yield returnExistingEmpsName();
        // Select the employee you want to update:
        inquirer_1.default.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employees
            }
        ]).then((employee) => {
            // Passes the id down the line so the function knows which record to update in the db:
            const employeeSplit = employee.employee.split('');
            const id = employeeSplit[0];
            return id;
        })
            .then((id) => secondPrompt(id));
        // This function gathers the details for the updated employee record:
        function secondPrompt(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const roles = yield returnRolesId();
                const managers = yield returnManagers();
                inquirer_1.default.prompt([
                    {
                        type: "input",
                        name: "newFirstName",
                        message: "What is this employee's first name?",
                    },
                    {
                        type: "input",
                        name: "newLastName",
                        message: "What is this employee's last name?",
                    },
                    {
                        type: "list",
                        name: "newRole",
                        message: "What is this employee's role ID?",
                        choices: roles
                    },
                    {
                        type: "list",
                        name: "newManager",
                        message: "If applicable, who is the manager for this new employee?",
                        choices: [...managers, 'None']
                    }
                ]).then((response) => {
                    // The ID needed the be converted to a number type:
                    const newId = Number(id);
                    // Creates an empty ID object and pushes the ID number to it:
                    const empId = {};
                    empId.empId = newId;
                    // Creates a final object to be passed to the SQL query combining the initial employee ID with the udpated employee information:
                    const finalObj = {};
                    finalObj.finalId = empId.empId;
                    finalObj.finalFName = response.newFirstName;
                    finalObj.finalLName = response.newLastName;
                    finalObj.finalRole = response.newRole;
                    finalObj.finalManager = response.newManager;
                    // Sends the object to the query for the update:
                    db.updateEmp(finalObj);
                })
                    .then(() => {
                    console.log('Your employee was updated in the system record!');
                })
                    .then(() => script());
            });
        }
    });
}
// Function for quitting app in switch of script():
function quit() {
    console.log('Exiting Application');
    process.exit(0);
}
