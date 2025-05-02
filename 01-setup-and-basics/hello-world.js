// hello-world.js - Your first Node.js program

/**
 * Welcome to Node.js!
 * 
 * This is a simple "Hello World" program that demonstrates
 * the basics of running JavaScript with Node.js
 */

// console is a global object in Node.js, similar to browser's console
// It provides methods for writing to stdout and stderr
console.log("Hello, World! Welcome to Node.js");

// The process object is a global that provides information about,
// and control over, the current Node.js process
console.log(`Node.js Version: ${process.version}`);
console.log(`Current working directory: ${process.cwd()}`);

// Demonstrating simple JavaScript in Node.js
const name = "Learner";
console.log(`Hello, ${name}! Happy coding!`);

/**
 * To run this program:
 * 1. Open your terminal/command prompt
 * 2. Navigate to this file's directory
 * 3. Type: node hello-world.js
 * 4. Press Enter
 * 
 * You should see the output messages in your terminal!
 */ 