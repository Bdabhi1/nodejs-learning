// path-example.js - Path Module Examples

/**
 * The 'path' module provides utilities for working with file and directory paths.
 * 
 * This is particularly useful because:
 * 1. Path formats differ between operating systems (Windows uses \ while Unix/Linux use /)
 * 2. Manually concatenating paths with string operations is error-prone
 * 3. Path manipulation often requires complex string operations
 * 
 * The path module handles these differences and provides consistent methods
 * across all operating systems.
 */

// Import the path module
const path = require('path');

console.log('------ PATH MODULE DEMO ------');

// SECTION 1: PATH COMPONENTS

/**
 * path.basename() returns the last portion of a path
 * Useful for extracting a filename from a path
 */
console.log('\n1. Getting the basename (filename):');
console.log(`   path.basename('/home/user/documents/file.txt'): ${path.basename('/home/user/documents/file.txt')}`);
// You can also remove the extension
console.log(`   path.basename('/home/user/documents/file.txt', '.txt'): ${path.basename('/home/user/documents/file.txt', '.txt')}`);

/**
 * path.dirname() returns the directory name of a path
 */
console.log('\n2. Getting the directory name:');
console.log(`   path.dirname('/home/user/documents/file.txt'): ${path.dirname('/home/user/documents/file.txt')}`);

/**
 * path.extname() returns the extension of a path
 */
console.log('\n3. Getting the file extension:');
console.log(`   path.extname('file.txt'): ${path.extname('file.txt')}`);
console.log(`   path.extname('image.jpg'): ${path.extname('image.jpg')}`);
console.log(`   path.extname('archive.tar.gz'): ${path.extname('archive.tar.gz')}`);
console.log(`   path.extname('document'): ${path.extname('document')}`); // No extension

// SECTION 2: PATH CREATION AND MANIPULATION

/**
 * path.join() joins all given path segments together
 * This is the safest way to concatenate paths
 */
console.log('\n4. Joining path segments:');
// Notice how it handles the separators for you
console.log(`   path.join('/home', 'user', 'documents', 'file.txt'): ${path.join('/home', 'user', 'documents', 'file.txt')}`);
// It also normalizes the result
console.log(`   path.join('/home/', '/user/', 'documents/'): ${path.join('/home/', '/user/', 'documents/')}`);
// Going up the directory tree with ..
console.log(`   path.join('/home/user', '../projects', 'app'): ${path.join('/home/user', '../projects', 'app')}`);

/**
 * path.resolve() resolves a sequence of paths to an absolute path
 * It processes from right to left until an absolute path is constructed
 */
console.log('\n5. Resolving paths:');
console.log(`   path.resolve('folder', 'subfolder', 'file.txt'): ${path.resolve('folder', 'subfolder', 'file.txt')}`);
// If given an absolute path, it overwrites previous segments
console.log(`   path.resolve('/home', 'user', '/etc', 'file.txt'): ${path.resolve('/home', 'user', '/etc', 'file.txt')}`);
// Current working directory
console.log(`   path.resolve('.'): ${path.resolve('.')}`);

/**
 * path.normalize() normalizes the given path
 * It resolves '..' and '.' segments and fixes slashes
 */
console.log('\n6. Normalizing paths:');
console.log(`   path.normalize('/home//user/docs/../downloads/file.txt'): ${path.normalize('/home//user/docs/../downloads/file.txt')}`);

// SECTION 3: PATH PROPERTIES

/**
 * path.parse() returns an object with path components
 */
console.log('\n7. Parsing a path into components:');
const pathObj = path.parse('/home/user/documents/file.txt');
console.log('   path.parse(\'/home/user/documents/file.txt\'):');
console.log('   ', pathObj);
console.log(`   - Root: ${pathObj.root}`);
console.log(`   - Dir: ${pathObj.dir}`);
console.log(`   - Base: ${pathObj.base}`);
console.log(`   - Name: ${pathObj.name}`);
console.log(`   - Ext: ${pathObj.ext}`);

/**
 * path.format() does the opposite of parse
 * It converts a path object to a path string
 */
console.log('\n8. Formatting a path object to string:');
const newPathObj = {
  root: '/',
  dir: '/home/user/projects',
  base: 'app.js',
  // name and ext are ignored if base is specified
  name: 'ignored',
  ext: '.ignored'
};
console.log(`   path.format(${JSON.stringify(newPathObj)}): ${path.format(newPathObj)}`);

// SECTION 4: PLATFORM-SPECIFIC INFORMATION

/**
 * path.sep provides the platform-specific path segment separator
 */
console.log('\n9. Path separator for this platform:');
console.log(`   path.sep: '${path.sep}'`);
// On Windows this would be '\' and on Linux/Unix it would be '/'

/**
 * path.delimiter provides the platform-specific path delimiter
 * This is used in PATH environment variable
 */
console.log('\n10. Path delimiter for this platform:');
console.log(`   path.delimiter: '${path.delimiter}'`);
// On Windows this would be ';' and on Linux/Unix it would be ':'

// SECTION 5: RELATIVE VS. ABSOLUTE PATHS

/**
 * path.isAbsolute() determines if the path is an absolute path
 */
console.log('\n11. Checking if a path is absolute:');
console.log(`   path.isAbsolute('/home/user'): ${path.isAbsolute('/home/user')}`);
console.log(`   path.isAbsolute('user/documents'): ${path.isAbsolute('user/documents')}`);
console.log(`   path.isAbsolute('.'): ${path.isAbsolute('.')}`);
// On Windows, absolute paths start with a drive letter (C:\) or UNC paths (\\server)
console.log(`   path.isAbsolute('C:\\Users\\user'): ${path.isAbsolute('C:\\Users\\user')}`);

/**
 * path.relative() returns the relative path from one path to another
 */
console.log('\n12. Getting relative path:');
console.log(`   path.relative('/home/user/documents', '/home/user/photos'): ${path.relative('/home/user/documents', '/home/user/photos')}`);
console.log(`   path.relative('/home/user', '/etc/config'): ${path.relative('/home/user', '/etc/config')}`);

// SECTION 6: PRACTICAL EXAMPLES

/**
 * Example 1: Working with the current file and directory
 */
console.log('\n13. Current file and directory:');
// __filename and __dirname are Node.js global variables
console.log(`   Current file: ${__filename}`);
console.log(`   Current directory: ${__dirname}`);

// Using path methods with __filename
console.log(`   Filename: ${path.basename(__filename)}`);
console.log(`   Directory: ${path.dirname(__filename)}`);

/**
 * Example 2: Creating paths for a project
 */
console.log('\n14. Creating project paths:');
const projectRoot = path.resolve(__dirname, '..');
console.log(`   Project root: ${projectRoot}`);
const configPath = path.join(projectRoot, 'config', 'settings.json');
console.log(`   Config file path: ${configPath}`);
const relativePath = path.relative(__dirname, configPath);
console.log(`   Relative path to config: ${relativePath}`);

/**
 * Example 3: Parsing file paths from user input
 */
console.log('\n15. Parsing and validating user input:');
const userInput = 'documents/../../etc/passwd';
console.log(`   User input: ${userInput}`);
// Normalizing and checking if it tries to escape
const normalizedPath = path.normalize(userInput);
console.log(`   Normalized: ${normalizedPath}`);
// We can see this is trying to access sensitive files through directory traversal
// In a real app, you'd validate this doesn't escape your intended directory

console.log('\nPath module demo complete!');

/**
 * To run this file, use:
 * node path-example.js
 */ 