// fs-examples.js - File System Module Examples

/**
 * The 'fs' (File System) module provides functionality for interacting with the file system.
 * It allows you to:
 * - Create, read, update, and delete files
 * - Work with directories
 * - Monitor files and directories for changes
 * - Set file permissions
 * 
 * The fs module provides both synchronous and asynchronous methods:
 * - Synchronous methods end with 'Sync' and block the execution until completed
 * - Asynchronous methods don't block execution and use callbacks or promises
 */

// Import the fs module
const fs = require('fs');
// Import the path module to work with file paths
const path = require('path');

// Define file paths for our examples
const testDir = path.join(__dirname, 'test-dir');
const testFile = path.join(testDir, 'test-file.txt');
const copiedFile = path.join(testDir, 'copied-file.txt');

console.log('------ FILE SYSTEM OPERATIONS DEMO ------');

// SECTION 1: DIRECTORY OPERATIONS

/**
 * Creating a directory
 * 
 * fs.mkdir() creates a new directory
 * Parameters:
 * - path: The directory path to create
 * - options: Optional settings
 * - callback: Function called when directory creation completes
 */
console.log('1. Creating a directory...');

// Check if directory exists first (good practice)
if (!fs.existsSync(testDir)) {
  // Synchronous version (blocks execution until complete)
  fs.mkdirSync(testDir);
  console.log(`   Created directory: ${testDir}`);
} else {
  console.log(`   Directory already exists: ${testDir}`);
}

// SECTION 2: FILE OPERATIONS

/**
 * Writing to a file
 * 
 * fs.writeFile() writes data to a file, replacing the file if it already exists
 * Parameters:
 * - file: The file path
 * - data: The content to write
 * - options: Optional settings (like encoding)
 * - callback: Function called when write completes
 */
console.log('\n2. Writing to a file (asynchronous)...');

const fileContent = 'Hello, Node.js File System!\nThis is a test file.\nLearning fs module is fun!';

// Asynchronous version with a callback
fs.writeFile(testFile, fileContent, 'utf8', (err) => {
  if (err) {
    console.error('   Error writing to file:', err);
    return;
  }
  
  console.log(`   Successfully wrote to: ${testFile}`);
  
  // Reading from a file (inside the callback to ensure proper sequence)
  readFileExample();
});

/**
 * Reading from a file
 * 
 * fs.readFile() reads the entire contents of a file
 * Parameters:
 * - path: The file path
 * - options: Optional settings (like encoding)
 * - callback: Function called with the file contents or error
 */
function readFileExample() {
  console.log('\n3. Reading from a file (asynchronous)...');
  
  fs.readFile(testFile, 'utf8', (err, data) => {
    if (err) {
      console.error('   Error reading file:', err);
      return;
    }
    
    console.log('   File contents:');
    console.log('   -------------------');
    console.log(`   ${data}`);
    console.log('   -------------------');
    
    // Continue with more examples
    appendFileExample();
  });
}

/**
 * Appending to a file
 * 
 * fs.appendFile() appends data to a file, creating the file if it doesn't exist
 * Parameters:
 * - path: The file path
 * - data: The content to append
 * - options: Optional settings
 * - callback: Function called when append completes
 */
function appendFileExample() {
  console.log('\n4. Appending to a file...');
  
  const additionalContent = '\nThis line was appended to the file!';
  
  fs.appendFile(testFile, additionalContent, 'utf8', (err) => {
    if (err) {
      console.error('   Error appending to file:', err);
      return;
    }
    
    console.log(`   Successfully appended to: ${testFile}`);
    
    // Verify the content was appended
    fs.readFile(testFile, 'utf8', (err, data) => {
      if (err) {
        console.error('   Error reading file after append:', err);
        return;
      }
      
      console.log('   Updated file contents:');
      console.log('   -------------------');
      console.log(`   ${data}`);
      console.log('   -------------------');
      
      // Continue with more operations
      copyFileExample();
    });
  });
}

/**
 * Copying a file
 * 
 * fs.copyFile() copies a file
 * Parameters:
 * - src: Source file path
 * - dest: Destination file path
 * - mode: Optional copy behavior
 * - callback: Function called when copy completes
 */
function copyFileExample() {
  console.log('\n5. Copying a file...');
  
  fs.copyFile(testFile, copiedFile, (err) => {
    if (err) {
      console.error('   Error copying file:', err);
      return;
    }
    
    console.log(`   Successfully copied ${testFile} to ${copiedFile}`);
    
    // Continue with file stats
    fileStatsExample();
  });
}

/**
 * Getting file information
 * 
 * fs.stat() returns information about a file
 * Parameters:
 * - path: The file path
 * - callback: Function called with the file stats
 */
function fileStatsExample() {
  console.log('\n6. Getting file information...');
  
  fs.stat(testFile, (err, stats) => {
    if (err) {
      console.error('   Error getting file stats:', err);
      return;
    }
    
    console.log('   File information:');
    console.log(`   - Size: ${stats.size} bytes`);
    console.log(`   - Created: ${stats.birthtime}`);
    console.log(`   - Last modified: ${stats.mtime}`);
    console.log(`   - Is file? ${stats.isFile()}`);
    console.log(`   - Is directory? ${stats.isDirectory()}`);
    
    // Continue with reading directory
    readDirExample();
  });
}

/**
 * Reading directory contents
 * 
 * fs.readdir() reads the contents of a directory
 * Parameters:
 * - path: The directory path
 * - options: Optional settings
 * - callback: Function called with the directory contents
 */
function readDirExample() {
  console.log('\n7. Reading directory contents...');
  
  fs.readdir(testDir, (err, files) => {
    if (err) {
      console.error('   Error reading directory:', err);
      return;
    }
    
    console.log(`   Contents of ${testDir}:`);
    files.forEach(file => {
      console.log(`   - ${file}`);
    });
    
    // Demonstrate promises and async/await with fs
    promiseExample();
  });
}

/**
 * Using Promises with fs (fs.promises API)
 * 
 * In modern Node.js, you can use promises instead of callbacks
 * through the fs.promises API
 */
async function promiseExample() {
  console.log('\n8. Using fs.promises (modern approach)...');
  
  // Import the promises version of fs
  const fsPromises = fs.promises;
  
  try {
    // Create a new file using promises
    const promiseFile = path.join(testDir, 'promise-example.txt');
    await fsPromises.writeFile(promiseFile, 'This file was created using fs.promises API!');
    console.log(`   Created file using promises: ${promiseFile}`);
    
    // Read the file
    const content = await fsPromises.readFile(promiseFile, 'utf8');
    console.log('   Content from promise-based read:');
    console.log(`   ${content}`);
    
    // Clean up (optional in this example)
    cleanupExample();
  } catch (error) {
    console.error('   Error in promise example:', error);
    cleanupExample();
  }
}

/**
 * Deleting files and directories
 * 
 * fs.unlink() removes a file
 * fs.rmdir() removes a directory
 */
function cleanupExample() {
  console.log('\n9. Cleaning up (deleting files and directories)...');
  
  const cleanup = () => {
    console.log('\nFile System example complete! All operations demonstrated.');
    console.log('Note: To keep the created files for inspection, we did not delete them.');
    console.log('You can uncomment the cleanup code to enable deletion.');
  };
  
  // NOTE: Commented out to leave files for inspection
  // Uncomment to enable deletion of test files and directory
  /*
  // Delete files first
  fs.unlink(testFile, (err) => {
    if (err) {
      console.error(`   Error deleting ${testFile}:`, err);
    } else {
      console.log(`   Deleted file: ${testFile}`);
    }
    
    fs.unlink(copiedFile, (err) => {
      if (err) {
        console.error(`   Error deleting ${copiedFile}:`, err);
      } else {
        console.log(`   Deleted file: ${copiedFile}`);
      }
      
      // Delete promise example file
      fs.unlink(path.join(testDir, 'promise-example.txt'), (err) => {
        if (err) {
          console.error('   Error deleting promise example file:', err);
        } else {
          console.log('   Deleted promise example file');
        }
        
        // Finally, delete the directory
        fs.rmdir(testDir, (err) => {
          if (err) {
            console.error(`   Error deleting directory ${testDir}:`, err);
          } else {
            console.log(`   Deleted directory: ${testDir}`);
          }
          
          cleanup();
        });
      });
    });
  });
  */
  
  // Since we commented out the cleanup, just call the cleanup function directly
  cleanup();
}

/**
 * NOTE: There are many more fs methods available, including:
 * - fs.rename(): Rename files or move them
 * - fs.chmod(): Change file permissions
 * - fs.watch(): Monitor files/directories for changes
 * - fs.createReadStream() / fs.createWriteStream(): Work with streams
 * - And many more!
 * 
 * To run this file, use:
 * node fs-examples.js
 */ 