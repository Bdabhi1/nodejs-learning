// runner.js - Demonstrates circular dependencies in Node.js

/**
 * This file serves as an entry point to demonstrate circular dependencies
 * between modules A and B.
 * 
 * When we require module A, it will require module B, which will require module A again,
 * creating a circular dependency.
 * 
 * Running this file will show the execution order and how Node.js handles
 * circular dependencies.
 */

console.log('------ CIRCULAR DEPENDENCIES DEMO ------');
console.log('\nCircular dependencies occur when two or more modules depend on each other.');
console.log('This creates a cycle in the dependency graph.');
console.log('\nThe following demonstrates what happens with a circular dependency:');
console.log('\n=== EXECUTION BEGINS ===');

// Require module A, which will trigger the circular dependency
const moduleA = require('./a');

console.log('\n=== EXECUTION SUMMARY ===');
console.log('\nWhat happened:');
console.log('1. We required module A');
console.log('2. Module A began executing and required module B');
console.log('3. Module B began executing and required module A (circular dependency)');
console.log('4. Node.js detected the circular dependency and gave module B an incomplete version of module A');
console.log('5. Module B finished executing and returned its exports to module A');
console.log('6. Module A finished executing and returned its exports to us');

console.log('\nCircular Dependencies:');
console.log('- Node.js allows circular dependencies, but they can be problematic');
console.log('- The module required second receives an incomplete version of the first module');
console.log('- This can lead to unexpected undefined values and bugs');
console.log('- Best practice is to avoid circular dependencies by restructuring your code');

console.log('\nTo demonstrate this works, let\'s call both modules\' functions:');
moduleA.greetFromA();

/**
 * To run this file, use:
 * node runner.js
 * 
 * Observe the console output to understand how Node.js handles circular dependencies.
 */ 