// math.js - Demonstrates multiple ways to export from a Node.js module

/**
 * This module demonstrates different techniques for exporting multiple 
 * pieces of functionality from a Node.js module.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Multiple Exports: Exporting multiple functions/values from a single module
 * 2. Different Export Styles: Using both module.exports and exports
 */

/**
 * UNDERSTANDING module.exports AND exports:
 * 
 * When a module is loaded, Node.js creates:
 * - A module object with a property called 'exports' (an empty object initially)
 * - A variable called 'exports' that references module.exports
 * 
 * So initially: exports === module.exports === {}
 * 
 * You can add properties to the exports object, but if you reassign exports itself,
 * it will no longer reference module.exports, and your exports won't work.
 */

// Basic arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// Advanced math functions
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}

/**
 * METHOD 1: Adding properties to the exports object
 * 
 * This is a common way to export multiple items.
 * You add each function or value as a property of the exports object.
 */

// Export basic arithmetic functions using the exports shorthand
exports.add = add;
exports.subtract = subtract;

/**
 * METHOD 2: Using object property shorthand
 * 
 * When the property name and variable name are the same,
 * you can use this shorthand in modern JavaScript.
 */

// Export multiplication and division with object shorthand
exports.multiply = multiply;
exports.divide = divide;

/**
 * METHOD 3: Assigning an object to module.exports
 * 
 * This overwrites the previous exports, so it should generally 
 * be done only once at the end of the file.
 * 
 * Note: If you did this earlier in the file, the previous exports
 * (using exports.add, etc.) would be lost!
 */

// Export everything including advanced functions using module.exports
module.exports = {
  add,         // Same as add: add
  subtract,    // Same as subtract: subtract
  multiply,    // Same as multiply: multiply
  divide,      // Same as divide: divide
  square,      // Same as square: square
  cube,        // Same as cube: cube
  
  // We can also include constants, computed properties, etc.
  PI: Math.PI,
  E: Math.E,
  
  // And even add new functions inline
  isPrime: function(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
  }
};

/**
 * IMPORTANT: The final module.exports assignment above overwrites the
 * earlier exports.add and exports.subtract assignments!
 * 
 * But we've included all the functions in the final module.exports object,
 * so they're still available to importers of this module.
 */

/**
 * INCORRECT WAYS TO EXPORT:
 * 
 * The following would NOT work:
 * 
 * exports = { add, subtract };  // WRONG! This breaks the reference to module.exports
 * 
 * To reassign the entire exports object, you must use module.exports:
 * module.exports = { add, subtract };  // Correct
 */ 