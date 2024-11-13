"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages needed for this application:
const inquirer_1 = __importDefault(require("inquirer"));
const index_js_1 = __importDefault(require("./db/index.js"));
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
                    name: 'View all Employess',
                    value: 'VIEW_EMPLOYEES',
                },
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
            default:
                console.log('Please make another selection');
        }
    });
}
function findEmployees() {
    db.viewAllEmployees()
        .then(({ rows }) => {
        const employees = rows;
        console.table(employees);
    })
        .then(() => script());
}
