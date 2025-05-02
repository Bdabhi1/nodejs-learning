// modules-intro.js - Introduction to Node.js modules

/**
 * MODULES IN NODE.JS
 * 
 * Node.js uses a module system to organize code into reusable pieces.
 * There are three types of modules in Node.js:
 * 1. Core modules (built-in modules that come with Node.js)
 * 2. Local modules (modules you create)
 * 3. Third-party modules (installed via npm)
 */

// Importing a core module
// The 'os' module provides operating system-related utility methods
const os = require('os');

// Using methods from the imported 'os' module
console.log('-------- OS INFORMATION --------');
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Total Memory: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`);
console.log(`Free Memory: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log('-------------------------------');

/**
 * The require() function is used to import modules in Node.js.
 * When you call require(), Node.js:
 * 1. Resolves the module path
 * 2. Loads the module
 * 3. Wraps the module code in a function
 * 4. Executes the module code
 * 5. Caches the module for future require() calls
 * 6. Returns the module.exports object
 */

// Another core module example - the path module
// The 'path' module provides utilities for working with file and directory paths
const path = require('path');

const filePath = '/users/documents/projects/app.js';

console.log('-------- PATH INFORMATION --------');
console.log(`File name: ${path.basename(filePath)}`);
console.log(`Directory name: ${path.dirname(filePath)}`);
console.log(`File extension: ${path.extname(filePath)}`);
console.log(`Is absolute path? ${path.isAbsolute(filePath)}`);
console.log(`Normalized path: ${path.normalize('/users/./documents/../documents/projects/app.js')}`);
console.log('----------------------------------');

/**
 * To run this program:
 * 1. Open your terminal/command prompt
 * 2. Navigate to this file's directory
 * 3. Type: node modules-intro.js
 * 4. Press Enter
 */ 