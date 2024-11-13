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
