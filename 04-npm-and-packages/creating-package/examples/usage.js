/**
 * Example of how to use the string-utils-sample package
 * 
 * In a real-world scenario, you would install the package using:
 * npm install string-utils-sample
 * 
 * But for this example, we're requiring it directly.
 */

// Import the package
const stringUtils = require('../index');

// Example 1: Basic usage
console.log('\n--- Basic Usage Examples ---');
console.log(`Capitalize: ${stringUtils.capitalizeFirstLetter('hello world')}`);
console.log(`Reverse: ${stringUtils.reverseString('hello world')}`);
console.log(`Truncate: ${stringUtils.truncate('This is a very long string that should be truncated', 15)}`);
console.log(`Word Count: ${stringUtils.countWords('This sentence has six words in it')}`);
console.log(`Slugify: ${stringUtils.slugify('This is a Test String!')}`);

// Example 2: Using with user input
console.log('\n--- User Input Example ---');
const userInput = 'User Input With Special Characters @#$ (Example)';
console.log('Original:', userInput);
console.log('Capitalized:', stringUtils.capitalizeFirstLetter(userInput));
console.log('Slugified:', stringUtils.slugify(userInput));

// Example 3: Working with article titles
console.log('\n--- Article Title Example ---');
const articleTitle = 'The Top 10 JavaScript Libraries You Should Know in 2023';
console.log('Original Title:', articleTitle);
console.log('URL Slug:', stringUtils.slugify(articleTitle));
console.log('Meta Title (Truncated):', stringUtils.truncate(articleTitle, 25));

// Example 4: Error handling
console.log('\n--- Error Handling Example ---');
console.log('Null input to capitalize:', stringUtils.capitalizeFirstLetter(null));
console.log('Number input to slugify:', stringUtils.slugify(12345));
console.log('Empty string word count:', stringUtils.countWords(''));

// Example 5: Chaining multiple utilities
console.log('\n--- Chaining Functions Example ---');
const rawInput = '  Multiple   spaces and WEIRD capitalization  ';
console.log('Raw Input:', rawInput);

const processed = stringUtils.capitalizeFirstLetter(
  stringUtils.slugify(rawInput).replace(/-/g, ' ')
);
console.log('Processed:', processed);

/**
 * Running this example:
 * node examples/usage.js
 * 
 * Expected output will show the results of all the function calls above,
 * demonstrating how the package can be used in different scenarios.
 */ 