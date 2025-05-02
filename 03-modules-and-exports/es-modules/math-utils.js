// math-utils.js - ES Modules example

/**
 * This file demonstrates ES Modules (ESM) syntax in Node.js.
 * 
 * ES Modules are the official standard format for JavaScript modules,
 * introduced in ES6 (ES2015). They differ from CommonJS modules in syntax
 * and behavior.
 * 
 * NOTE: To use ES Modules in Node.js, you need either:
 * 1. Set "type": "module" in your package.json (as we've done)
 * 2. Use the .mjs file extension instead of .js
 * 3. Run Node.js with the --experimental-modules flag (older versions)
 */

/**
 * NAMED EXPORTS:
 * 
 * You can export multiple items by placing 'export' before their declarations.
 * These are called "named exports" and must be imported using the same names.
 */

// Export a constant
export const PI = 3.14159265359;

// Export functions directly with the 'export' keyword
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Define functions first, then export them
function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Export multiple items in a single statement
export { multiply, divide };

// Export with a different name using 'as'
function square(x) {
  return x * x;
}

export { square as squared };

/**
 * DEFAULT EXPORT:
 * 
 * Each module can have one default export.
 * This is typically the main functionality of the module.
 * It can be imported without using curly braces.
 */
const MathUtils = {
  add,
  subtract,
  multiply,
  divide,
  square,
  
  // Additional methods not exported individually
  cube: x => x * x * x,
  calculateArea: (shape, ...args) => {
    switch(shape) {
      case 'circle':
        return PI * args[0] * args[0];
      case 'rectangle':
        return args[0] * args[1];
      case 'triangle':
        return (args[0] * args[1]) / 2;
      default:
        throw new Error('Unsupported shape');
    }
  }
};

// The default export
export default MathUtils;

/**
 * KEY DIFFERENCES FROM COMMONJS:
 * 
 * 1. SYNTAX: 
 *    - ESM: import/export
 *    - CJS: require/module.exports
 * 
 * 2. STATIC VS DYNAMIC:
 *    - ESM imports are static and analyzed at compile time
 *    - CJS requires are dynamic and evaluated at runtime
 * 
 * 3. ASYNCHRONOUS LOADING:
 *    - ESM modules are loaded asynchronously
 *    - CJS modules are loaded synchronously
 * 
 * 4. CIRCULAR DEPENDENCIES:
 *    - ESM handles circular dependencies better by separating
 *      module loading from evaluation
 * 
 * 5. SELECTIVITY:
 *    - ESM allows selective imports (only import what you need)
 *    - CJS requires the entire module, though you can destructure
 */ 