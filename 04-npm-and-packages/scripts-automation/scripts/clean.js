/**
 * clean.js - Script to clean build directories
 * 
 * This script removes the dist directory and any temporary files
 * to ensure a clean build process.
 */

const fs = require('fs');
const path = require('path');

// Paths to clean
const pathsToClean = [
  path.join(__dirname, '../dist'),
  path.join(__dirname, '../temp'),
  path.join(__dirname, '../.cache')
];

console.log('🧹 Cleaning build directories...');

// Function to delete a directory recursively
function deleteDirectory(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    console.log(`  - Removing: ${path.relative(process.cwd(), directoryPath)}`);
    try {
      fs.rmSync(directoryPath, { recursive: true, force: true });
    } catch (err) {
      console.error(`    Error removing ${directoryPath}:`, err.message);
    }
  }
}

// Clean each directory
pathsToClean.forEach(deleteDirectory);

// Create dist directory
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.log(`  - Creating: ${path.relative(process.cwd(), distPath)}`);
  fs.mkdirSync(distPath);
  fs.mkdirSync(path.join(distPath, 'js'), { recursive: true });
  fs.mkdirSync(path.join(distPath, 'css'), { recursive: true });
}

console.log('✅ Clean completed!\n'); 