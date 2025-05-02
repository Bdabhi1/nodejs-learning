// b.js - Second module in circular dependency demonstration

/**
 * This file is part of a demonstration of circular dependencies in Node.js.
 * It requires module A, which has already required this module (B).
 * 
 * CIRCULAR DEPENDENCY:
 *   module A → requires module B (this file)
 *   module B (this file) → requires module A (circular reference)
 */

console.log('Module B: Start of execution');

/**
 * At this point in the code, we're about to require module A.
 * Let's understand what will happen:
 * 
 * 1. Node.js is already in the process of loading module A when this require is called
 * 2. Node.js detects the circular dependency
 * 3. Instead of entering an infinite loop, Node.js returns an incomplete version of module A
 * 4. The incomplete version contains only the exports defined BEFORE module A required module B
 */

// Require module A, creating a circular dependency
const moduleA = require('./a');

/**
 * At this point, we have an incomplete version of module A.
 * If module A didn't export anything before requiring module B,
 * then moduleA would be an empty object {}.
 */

// Let's see what we received from module A
console.log('Module B: After requiring module A');
console.log(`Module A contents: ${JSON.stringify(moduleA)}`);
console.log(`Is module A's function available? ${typeof moduleA.greetFromA === 'function'}`);

// Define and export a function
function greetFromB() {
  console.log('Hello from module B!');
  
  // This might not work if greetFromA wasn't exported by module A
  // before module A required module B
  if (typeof moduleA.greetFromA === 'function') {
    console.log('Module B can access module A\'s functions.');
  } else {
    console.log('Module B cannot access module A\'s functions yet.');
  }
}

// Export the function and a value
module.exports = {
  greetFromB: greetFromB,
  valueFromB: 'I am module B'
};

console.log('Module B: After exports definition');
console.log('Module B: End of execution');

/**
 * BEST PRACTICES TO HANDLE CIRCULAR DEPENDENCIES:
 * 
 * 1. RESTRUCTURE YOUR CODE:
 *    - The best solution is to avoid circular dependencies entirely
 *    - Extract shared functionality into a third module that both modules can depend on
 * 
 * 2. EXPORT BEFORE REQUIRING:
 *    - If circular dependencies are necessary, export values before requiring
 *      the module that depends on you
 *    - Example:
 *      module.exports.value = 'something';
 *      const other = require('./other');
 * 
 * 3. USE A FUNCTION TO DEFER RESOLUTION:
 *    - Wrap dependent code in functions that are called only after both modules are loaded
 *    - Export functions that access the other module's exports when called, not when defined
 * 
 * 4. USE ES MODULES:
 *    - ES Modules (import/export) handle circular dependencies differently than CommonJS
 *    - They can sometimes resolve issues that CommonJS can't handle elegantly
 */ 