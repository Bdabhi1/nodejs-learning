/**
 * build-css.js - Script to build CSS files
 * 
 * This is a simplified build script that demonstrates how you can
 * create custom build processes using Node.js scripts.
 * In a real project, you would likely use tools like sass, less,
 * postcss, or a bundler with CSS support.
 */

const fs = require('fs');
const path = require('path');

// Define paths
const srcDir = path.join(__dirname, '../src/css');
const destDir = path.join(__dirname, '../dist/css');

console.log('🎨 Building CSS files...');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get all CSS files from the source directory
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.css'));

if (files.length === 0) {
  console.log('  No CSS files found to build.');
} else {
  // Simple "build" process - in this case, we're just copying files with minimal processing
  // In a real project, you would use proper CSS processing tools
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    // Read the source file
    const content = fs.readFileSync(srcPath, 'utf8');
    
    // Simulate some processing (removing comments and whitespace in production)
    let processedContent = content;
    if (process.env.NODE_ENV === 'production') {
      // Very simple minification (not a full CSS minifier)
      processedContent = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')             // Collapse whitespace
        .replace(/\s*({|}|;|,|:)\s*/g, '$1'); // Remove whitespace around punctuation
      
      console.log(`  - Minifying ${file}`);
    }
    
    // Add a build timestamp comment
    const timestamp = new Date().toISOString();
    processedContent = `/* Built: ${timestamp} */\n${processedContent}`;
    
    // Write to destination
    fs.writeFileSync(destPath, processedContent);
    console.log(`  - Built: ${file}`);
  });
}

console.log('✅ CSS build completed!\n'); 