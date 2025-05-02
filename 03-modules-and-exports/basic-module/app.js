// app.js - Demonstrates using a basic Node.js module

/**
 * This file shows how to import and use a module in Node.js.
 * It imports the greet.js module we created and uses its functionality.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Importing Modules: Using the require() function to import modules
 * 2. Using Module Functionality: Invoking functions exported by a module
 */

/**
 * The require() function is used to import modules in Node.js.
 * When you call require() with a path to a JavaScript file:
 * 
 * 1. Node.js finds and loads the module
 * 2. It executes the code in the module
 * 3. It returns whatever the module exported via module.exports
 * 
 * The './' prefix indicates that the module is a local file relative to the current directory.
 */
const greet = require('./greet');

/**
 * WHAT WE GET WHEN WE REQUIRE './greet':
 * 
 * Since greet.js exports a function using `module.exports = greet`,
 * the require('./greet') call returns that function, which we store
 * in the 'greet' constant.
 * 
 * Note that we can't access privateGreeting or capitalizeFirstLetter
 * from greet.js because they weren't exported.
 */

// Now we can use the imported function
console.log('------ BASIC MODULE DEMO ------');

// Using the greet function with default greeting
const result1 = greet('john');
console.log(result1); // "Hello, John!"

// Using the greet function with custom greeting
const result2 = greet('mary', 'Good morning');
console.log(result2); // "Good morning, Mary!"

// We can use the greet function directly inside a string interpolation
console.log(`A special message: ${greet('world', 'Greetings')}`);

/**
 * Try to run this file with node:
 * node app.js
 * 
 * You should see the greetings printed to the console.
 */

/**
 * Important to understand:
 * 
 * 1. The code in greet.js runs once when we require it
 * 2. If we require the same module multiple times in our application,
 *    Node.js loads it only once and then caches it
 * 3. Each module has its own scope, so variables defined in greet.js
 *    don't pollute the global scope of our application
 */

// Let's prove the caching behavior:
console.log('\nDemonstrating module caching:');

const greet1 = require('./greet');
const greet2 = require('./greet');

// These are the same function (same reference in memory)
console.log('Are greet1 and greet2 the same?', greet1 === greet2); // true

/**
 * MENTAL MODEL OF NODE.JS MODULES:
 * 
 * Think of modules like this:
 * 
 * Node.js wraps your module code in a function like:
 * 
 * (function(exports, require, module, __filename, __dirname) {
 *   // Your module code goes here
 * });
 * 
 * This provides module scope isolation while giving your module access
 * to important variables like exports, require, module, etc.
 */ 