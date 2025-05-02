// index.js - Main file for basic npm project example

/**
 * This file demonstrates how to use various npm packages in a Node.js application.
 * It shows how to import and use packages that we've installed through npm.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Importing packages using require()
 * 2. Using package functionality
 * 3. See how different packages work together
 */

// ---------------------------------------------------------
// IMPORTING PACKAGES
// ---------------------------------------------------------

/**
 * Importing Dependencies
 * 
 * This is how we import packages that we've installed via npm.
 * The packages must be listed in the package.json file and installed 
 * with 'npm install' command.
 */

// axios - A promise-based HTTP client for making API requests
const axios = require('axios');

// chalk - A package for styling terminal strings with colors
const chalk = require('chalk');

// lodash - A utility library providing helpful functions
const _ = require('lodash');
// We commonly use _ as the variable name for lodash by convention

// ---------------------------------------------------------
// USING THE PACKAGES
// ---------------------------------------------------------

/**
 * Main function to demonstrate package usage
 * We're using an async function since axios returns promises
 */
async function demoPackages() {
  console.log(chalk.blue.bold('\n===== NPM PACKAGES DEMO =====\n'));

  // ------------------- CHALK DEMO -------------------
  console.log(chalk.green('1. Using chalk for colored terminal output:'));
  
  // Simple colored text
  console.log(chalk.blue('  This text is blue'));
  console.log(chalk.red('  This text is red'));
  
  // Combining styles
  console.log(chalk.yellow.bgBlack.bold('  Yellow text on black background'));
  
  // Custom function to log with timestamp
  const logWithTime = (message, color = 'white') => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      chalk.gray(`[${timestamp}]`),
      chalk[color](message)
    );
  };
  
  logWithTime('  This message has a timestamp', 'green');
  
  // ------------------- LODASH DEMO -------------------
  console.log(chalk.green('\n2. Using lodash for utility functions:'));
  
  // Array manipulation
  const numbers = [1, 2, 3, 4, 5];
  console.log('  Original array:', numbers);
  console.log('  Chunked array:', _.chunk(numbers, 2));
  
  // Object manipulation
  const user = {
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    }
  };
  
  // Deep clone an object
  const userCopy = _.cloneDeep(user);
  console.log('  Deep cloned object:', userCopy);
  
  // Pick specific properties
  const userBasic = _.pick(user, ['name', 'age']);
  console.log('  Picked properties:', userBasic);
  
  // Get nested property safely (won't error if path doesn't exist)
  console.log('  User city:', _.get(user, 'address.city', 'Unknown'));
  console.log('  User zipcode:', _.get(user, 'address.zipcode', 'Unknown'));
  
  // ------------------- AXIOS DEMO -------------------
  console.log(chalk.green('\n3. Using axios for HTTP requests:'));
  
  try {
    logWithTime('  Fetching data from JSONPlaceholder API...', 'cyan');
    
    // Make a GET request to a public API
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Style the output
    console.log(chalk.cyan('  Response data:'));
    console.log(chalk.cyan(`    Title: ${response.data.title}`));
    console.log(chalk.cyan(`    Body: ${_.truncate(response.data.body, { length: 60 })}`));
    
    logWithTime('  Data fetched successfully!', 'green');
  } catch (error) {
    // Error handling
    logWithTime(`  Error fetching data: ${error.message}`, 'red');
  }
  
  // ------------------- COMBINING PACKAGES -------------------
  console.log(chalk.green('\n4. Combining multiple packages:'));
  
  try {
    // Use axios to fetch data
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    // Use lodash to process the data
    const users = _.map(response.data, user => _.pick(user, ['id', 'name', 'email']));
    
    // Use lodash to group users by first letter of name
    const groupedUsers = _.groupBy(users, user => user.name[0].toUpperCase());
    
    // Use chalk to display formatted results
    console.log(chalk.yellow('  Users grouped by first letter of name:'));
    
    _.forEach(groupedUsers, (users, letter) => {
      console.log(chalk.magenta(`\n  --- Group ${letter} ---`));
      users.forEach(user => {
        console.log(chalk.cyan(`    ${user.name} (${user.email})`));
      });
    });
    
  } catch (error) {
    console.log(chalk.red(`  Error: ${error.message}`));
  }
  
  console.log(chalk.blue.bold('\n===== DEMO COMPLETE =====\n'));
}

// Run the demo function
demoPackages().catch(error => {
  console.error('An error occurred:', error);
});

/**
 * TAKEAWAYS ABOUT NPM PACKAGES:
 * 
 * 1. npm has a vast ecosystem of packages for almost any functionality you need
 * 2. Using packages saves you time by leveraging existing code
 * 3. Different packages can be combined to build complex applications
 * 4. Always check package documentation to learn about the API
 * 5. Look at package download stats and GitHub stars to evaluate quality
 */ 