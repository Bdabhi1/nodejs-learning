// greet.js - A basic Node.js module

/**
 * In Node.js, a module is simply a JavaScript file that exports some functionality.
 * This file demonstrates a basic module that exports a single function.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Module Scope: Variables and functions defined in this file are only accessible
 *    within this file unless they are explicitly exported.
 * 2. Single Export: This module exports just one function using module.exports.
 */

/**
 * A private variable that is only accessible within this module
 * This variable cannot be accessed from outside unless we export it
 */
const defaultGreeting = 'Hello';

/**
 * A private function that is only accessible within this module
 * This is an implementation detail that users of our module don't need to know about
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * The main greet function that we want to expose to other files
 * 
 * @param {string} name - The name to greet
 * @param {string} [greeting=defaultGreeting] - Optional custom greeting
 * @returns {string} The complete greeting message
 */
function greet(name, greeting = defaultGreeting) {
  // Ensure name is properly formatted
  const formattedName = capitalizeFirstLetter(name.toLowerCase());
  
  // Return the complete greeting
  return `${greeting}, ${formattedName}!`;
}

/**
 * module.exports is the object that defines what is exported from this module.
 * Whatever you assign to module.exports will be available when this module is imported.
 * 
 * Here, we're exporting the greet function directly, so when someone requires this module,
 * they will get the greet function as the module's exported value.
 */
module.exports = greet;

/**
 * Note that the defaultGreeting variable and capitalizeFirstLetter function 
 * are not exported, so they remain private to this module.
 */ 