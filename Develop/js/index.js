const inquirer = require('inquirer');
const queries = require('./queries');

// Main menu prompt
function mainMenu() {
  inquirer.prompt([
    // Add your prompt questions for the main menu here
  ]).then((answers) => {
    // Handle the user's choice here
  });
}

mainMenu();
