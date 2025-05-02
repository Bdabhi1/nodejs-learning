// index.js - ES Modules import demonstration

/**
 * This file demonstrates how to import from ES Modules.
 * It shows several different import patterns and their use cases.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Named imports: Importing specific exports by name
 * 2. Default imports: Importing the default export
 * 3. Mixed imports: Combining default and named imports
 * 4. Namespace imports: Importing all exports as a namespace object
 */

console.log('------ ES MODULES DEMO ------');

/**
 * METHOD 1: NAMED IMPORTS
 * 
 * Use curly braces {} to import specific named exports.
 * You must use the exact name as in the export (or use the 'as' keyword to rename).
 */
console.log('\n1. Using Named Imports:');

// Import specific named exports
import { add, subtract, PI } from './math-utils.js';

console.log(`   Addition: 5 + 3 = ${add(5, 3)}`);
console.log(`   Subtraction: 10 - 4 = ${subtract(10, 4)}`);
console.log(`   PI value: ${PI}`);

/**
 * METHOD 2: RENAMING IMPORTS
 * 
 * You can rename imports using the 'as' keyword to avoid name conflicts
 * or to use more appropriate names in your context.
 */
console.log('\n2. Renaming Imports:');

// Import and rename
import { multiply as mul, divide as div, squared } from './math-utils.js';

console.log(`   Multiplication (renamed to mul): 6 * 7 = ${mul(6, 7)}`);
console.log(`   Division (renamed to div): 20 / 4 = ${div(20, 4)}`);
console.log(`   Square function (exported as 'squared'): 9² = ${squared(9)}`);

/**
 * METHOD 3: DEFAULT IMPORT
 * 
 * Default exports are imported without curly braces.
 * You can give the import any name you want.
 */
console.log('\n3. Using Default Import:');

// Import the default export
import MathUtils from './math-utils.js';

console.log(`   Using the default export object:`);
console.log(`   Cube function: 3³ = ${MathUtils.cube(3)}`);
console.log(`   Area of circle (radius 5): ${MathUtils.calculateArea('circle', 5)}`);
console.log(`   Area of rectangle (4x6): ${MathUtils.calculateArea('rectangle', 4, 6)}`);

// We can also access methods that were separately exported
console.log(`   Square function (from the object): 7² = ${MathUtils.square(7)}`);

/**
 * METHOD 4: COMBINED DEFAULT AND NAMED IMPORTS
 * 
 * You can import the default export and named exports in a single statement.
 */
console.log('\n4. Combining Default and Named Imports:');

// This is equivalent to separate import statements,
// but more concise when you need both default and named exports.
// 
// import Utils from './math-utils.js';
// import { add, PI } from './math-utils.js';
// 
// Shortened to:
// import Utils, { add, PI } from './math-utils.js';
//
// We're not executing this to avoid duplicate imports,
// but the syntax would work as shown above.

/**
 * METHOD 5: NAMESPACE IMPORT
 * 
 * Import all exports (named and default) as properties of a single object.
 * Similar to CommonJS require() but with different behavior.
 */
console.log('\n5. Using Namespace Import:');

// Import everything as a namespace
import * as MathModule from './math-utils.js';

// The default export is available as the 'default' property
console.log(`   Default export via namespace: ${typeof MathModule.default}`);
console.log(`   Using the default export's method: ${MathModule.default.cube(4)}`);

// Named exports are properties of the namespace object
console.log(`   Named exports via namespace:`);
console.log(`   - add: ${MathModule.add(8, 2)}`);
console.log(`   - PI: ${MathModule.PI}`);
console.log(`   - squared: ${MathModule.squared(5)}`);

/**
 * KEY ADVANTAGES OF ES MODULES:
 * 
 * 1. Static Analysis:
 *    - Imports/exports are statically analyzed at parse time
 *    - Enables better tree-shaking (dead code elimination)
 * 
 * 2. Asynchronous Loading:
 *    - Better performance, especially in browsers
 * 
 * 3. Explicit Imports:
 *    - Clear dependency graph
 *    - Import only what you need
 * 
 * 4. Better Support for Circular Dependencies:
 *    - More predictable behavior with circular references
 * 
 * 5. Future Compatibility:
 *    - The JavaScript standard moving forward
 */

console.log('\nES Modules demo complete!');

/**
 * To run this file:
 * node index.js
 * 
 * Remember that ES Modules require Node.js v12.17.0 or later,
 * and to have "type": "module" in your package.json or use .mjs extension.
 */ 