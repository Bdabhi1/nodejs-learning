// a.js - First module in circular dependency demonstration

/**
 * This file is part of a demonstration of circular dependencies in Node.js.
 * It requires module B, which in turn requires this module (A).
 * 
 * CIRCULAR DEPENDENCY:
 *   module A (this file) → requires module B
 *   module B → requires module A (circular reference)
 */

console.log('Module A: Start of execution');

/**
 * At this point in the code, we're about to require module B.
 * Let's understand what will happen:
 * 
 * 1. Node.js will start executing this file (module A)
 * 2. When it reaches the require('./b') statement, it will pause execution of module A
 * 3. It will start executing module B
 * 4. When module B requires module A, Node.js will detect the circular dependency
 * 5. Instead of failing, Node.js will return a partial/incomplete version of module A
 */

// Require module B
const moduleB = require('./b');

/**
 * At this point, module B has been loaded, but it received an incomplete
 * version of module A. The incomplete version of module A contains whatever
 * was exported BEFORE the require statement.
 */

// Define and export a function
function greetFromA() {
  console.log('Hello from module A!');
  console.log(`Module B's value is: ${moduleB.valueFromB}`);
}

// Export the function and a value
module.exports = {
  greetFromA: greetFromA,
  valueFromA: 'I am module A'
};

// Execute code to show the state of things
console.log('Module A: After exports definition');
console.log(`Is module B's function available? ${typeof moduleB.greetFromB === 'function'}`);
console.log(`Accessing module B's value: ${moduleB.valueFromB}`);

// This will work fine, as module B is fully loaded at this point
moduleB.greetFromB();

console.log('Module A: End of execution');

/**
 * KEY TAKEAWAYS ABOUT CIRCULAR DEPENDENCIES:
 * 
 * 1. Node.js allows circular dependencies, but they can lead to unexpected behavior
 * 2. The module that is "required" second will receive an incomplete version
 *    of the module doing the requiring
 * 3. This incomplete version only contains exports defined BEFORE the require statement
 * 4. To avoid issues, it's best to:
 *    - Restructure your code to avoid circular dependencies
 *    - If unavoidable, define exports before requiring the circular module
 */ 