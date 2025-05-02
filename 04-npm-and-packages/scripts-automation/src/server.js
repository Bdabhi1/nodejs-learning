/**
 * server.js - Simple Express server for demonstrating npm scripts
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Environment-specific settings
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Server running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Basic routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'npm-scripts-demo',
    mode: isProduction ? 'production' : 'development',
    time: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  =================================================
    Server started on http://localhost:${PORT}
    Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}
  =================================================
  `);
  
  // In development mode, log out available routes
  if (!isProduction) {
    console.log('  Available routes:');
    console.log('  - GET / - Homepage');
    console.log('  - GET /api/info - Server info');
    console.log('  =================================================\n');
  }
}); 