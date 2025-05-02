/**
 * build-js.js - Script to build JavaScript files
 * 
 * This is a simplified build script that demonstrates how you can
 * create custom build processes using Node.js scripts.
 * In a real project, you would likely use tools like webpack,
 * rollup, or esbuild for more complex builds.
 */

const fs = require('fs');
const path = require('path');

// Define paths
const srcDir = path.join(__dirname, '../src/js');
const destDir = path.join(__dirname, '../dist/js');

console.log('📦 Building JavaScript files...');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get all JS files from the source directory
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.js'));

if (files.length === 0) {
  console.log('  No JavaScript files found to build.');
} else {
  // Simple "build" process - in this case, we're just copying files
  // In a real project, you would bundle, minify, transpile, etc.
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    // Read the source file
    const content = fs.readFileSync(srcPath, 'utf8');
    
    // Simulate some processing (e.g., removing console.logs in production)
    let processedContent = content;
    if (process.env.NODE_ENV === 'production') {
      processedContent = content.replace(/console\.log\([^)]+\);?/g, '');
      console.log(`  - Removing console.logs from ${file}`);
    }
    
    // Add a build timestamp comment
    const timestamp = new Date().toISOString();
    processedContent = `/* Built: ${timestamp} */\n${processedContent}`;
    
    // Write to destination
    fs.writeFileSync(destPath, processedContent);
    console.log(`  - Built: ${file}`);
  });
}

console.log('✅ JavaScript build completed!\n'); 