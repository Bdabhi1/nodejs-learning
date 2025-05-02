// http-server.js - HTTP Module Examples

/**
 * The 'http' module provides functionality for creating HTTP servers and clients.
 * 
 * This is one of the most important modules in Node.js as it allows you to:
 * - Create web servers
 * - Make HTTP requests to other servers
 * - Handle incoming HTTP requests and send responses
 * - Work with HTTP headers, methods, status codes, etc.
 * 
 * This example focuses on creating a simple HTTP server.
 */

// Import the http module
const http = require('http');
// Import the url module for parsing URL parameters
const url = require('url');

console.log('------ HTTP SERVER DEMO ------');

/**
 * Creating an HTTP Server
 * 
 * The http.createServer() method creates a new HTTP server and returns it.
 * The server object is an EventEmitter that emits events like 'request'.
 * 
 * We pass a callback function that will be executed every time a request is made to the server.
 * This callback function has two parameters:
 * - req (request): An object containing information about the incoming request
 * - res (response): An object used to send a response back to the client
 */
const server = http.createServer((req, res) => {
  // Get the URL from the request and parse it
  // The true parameter tells the url.parse() method to parse the query string
  const parsedUrl = url.parse(req.url, true);
  
  // Extract the path and query parameters from the parsed URL
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  console.log(`\nReceived request: ${req.method} ${path}`);
  console.log(`Request headers:`, req.headers);
  
  /**
   * HTTP Headers
   * 
   * HTTP headers allow the client and server to pass additional information with the request or response.
   * Headers are case-insensitive name-value pairs separated by a colon.
   */
  // Set response headers
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Powered-By', 'Node.js');
  
  /**
   * HTTP Status Codes
   * 
   * Status codes are 3-digit numbers that indicate the result of the HTTP request:
   * - 1xx: Informational responses
   * - 2xx: Successful responses
   * - 3xx: Redirects
   * - 4xx: Client errors
   * - 5xx: Server errors
   */
  
  /**
   * Routing
   * 
   * Routing refers to determining how an application responds to a client request
   * to a particular endpoint, which is a URI (or path) and a specific HTTP request method.
   */
  // Basic routing based on the path
  if (path === '/' || path === '/home') {
    // Set status code to 200 (OK)
    res.statusCode = 200;
    
    // Write the response body
    res.write('<html><head><title>Home Page</title></head><body>');
    res.write('<h1>Welcome to our HTTP Server Demo</h1>');
    res.write('<p>This is a simple Node.js HTTP server.</p>');
    res.write('<ul>');
    res.write('<li><a href="/">Home</a></li>');
    res.write('<li><a href="/about">About</a></li>');
    res.write('<li><a href="/api">API</a></li>');
    res.write('<li><a href="/greet?name=John">Greet John</a></li>');
    res.write('</ul>');
    res.write('</body></html>');
    
    // End the response
    res.end();
  } 
  else if (path === '/about') {
    res.statusCode = 200;
    res.write('<html><head><title>About Page</title></head><body>');
    res.write('<h1>About Our HTTP Server</h1>');
    res.write('<p>This example demonstrates the basics of creating an HTTP server in Node.js.</p>');
    res.write('<p><a href="/">Back to Home</a></p>');
    res.write('</body></html>');
    res.end();
  }
  else if (path === '/api') {
    // Setting the Content-Type to application/json for API responses
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    
    // Creating a JSON response
    const jsonResponse = {
      message: 'This is a JSON response from the API endpoint',
      timestamp: new Date().toISOString(),
      path: path
    };
    
    // Converting the JSON object to a string and sending it
    res.end(JSON.stringify(jsonResponse));
  }
  else if (path === '/greet') {
    // Using query parameters
    const name = query.name || 'Guest';
    
    res.statusCode = 200;
    res.write('<html><head><title>Greeting</title></head><body>');
    res.write(`<h1>Hello, ${name}!</h1>`);
    res.write('<p>This page demonstrates how to use query parameters.</p>');
    res.write('<p><a href="/">Back to Home</a></p>');
    res.write('</body></html>');
    res.end();
  }
  else {
    // Handling 404 Not Found
    res.statusCode = 404;
    res.write('<html><head><title>404 Not Found</title></head><body>');
    res.write('<h1>404 Not Found</h1>');
    res.write(`<p>The requested page '${path}' does not exist.</p>`);
    res.write('<p><a href="/">Back to Home</a></p>');
    res.write('</body></html>');
    res.end();
  }
});

/**
 * PORT and HOST
 * 
 * The server needs to listen on a specific port and host to accept connections.
 * Common development ports: 3000, 8000, 8080
 * Production websites typically use port 80 for HTTP and 443 for HTTPS
 */
const PORT = 3000;
const HOST = 'localhost'; // or '127.0.0.1'

/**
 * Start the server
 * 
 * The server.listen() method starts the server and makes it listen for incoming requests.
 * Parameters:
 * - port: The port number
 * - hostname: The hostname or IP address (optional)
 * - backlog: The maximum length of the queue of pending connections (optional)
 * - callback: Called when the server starts listening
 */
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}/`);
  console.log('To stop the server, press Ctrl+C');
  console.log('\nAvailable routes:');
  console.log('- http://localhost:3000/           (Home page)');
  console.log('- http://localhost:3000/about      (About page)');
  console.log('- http://localhost:3000/api        (JSON API)');
  console.log('- http://localhost:3000/greet?name=YourName (Greeting with query parameter)');
});

/**
 * Event Handling
 * 
 * The HTTP server emits various events that we can listen for.
 */

// The 'error' event is emitted when an error occurs in the server
server.on('error', (error) => {
  console.error('Server error:', error.message);
  
  // Common errors:
  // EACCES: Permission denied (trying to use a privileged port without proper permissions)
  // EADDRINUSE: Address already in use (another server is already running on the specified port)
});

/**
 * Making HTTP Requests
 * 
 * The http module can also be used to make requests to other servers.
 * See the example below (commented out to keep the server example focused).
 */

/*
// Making a GET request
http.get('http://example.com', (response) => {
  let data = '';
  
  // A chunk of data has been received
  response.on('data', (chunk) => {
    data += chunk;
  });
  
  // The whole response has been received
  response.on('end', () => {
    console.log('Response data:', data);
  });
}).on('error', (error) => {
  console.error('Error making request:', error.message);
});
*/

/**
 * To run this file, use:
 * node http-server.js
 * 
 * Then open a web browser and navigate to:
 * http://localhost:3000/
 * 
 * You can also use tools like curl or Postman to test the API endpoint:
 * curl http://localhost:3000/api
 */ 