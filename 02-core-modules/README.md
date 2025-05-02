# Node.js Core Modules

Welcome to the second part of your Node.js journey! This section focuses on the built-in core modules that come with Node.js.

## What are Core Modules?

Core modules are modules that are compiled into the Node.js binary. They provide essential functionalities without requiring any additional installation. When you install Node.js, these modules are automatically available for use.

You can import any core module using the `require()` function:

```javascript
const fs = require('fs');
const path = require('path');
```

## Important Core Modules

Here are some of the most commonly used core modules in Node.js:

### 1. File System (fs)
- For working with files and directories
- Provides functions for reading, writing, updating, and deleting files
- Both synchronous and asynchronous versions of methods

### 2. Path (path)
- For working with file and directory paths
- Handles differences between operating systems' path formats
- Provides methods for path normalization, joining, resolving, etc.

### 3. HTTP/HTTPS (http, https)
- For creating HTTP servers and making HTTP requests
- The foundation for web applications in Node.js
- Allows you to handle HTTP methods, headers, and request/response data

### 4. URL (url)
- For parsing and formatting URLs
- Provides utilities to work with URL components (protocol, host, path, query parameters, etc.)

### 5. OS (os)
- For interacting with the operating system
- Provides information about the computer's operating system
- Useful for system-level operations and information

### 6. Util (util)
- Provides utility functions for various tasks
- Includes functions for formatting strings, inspecting objects, etc.

### 7. Events (events)
- Implements the Observer pattern
- The backbone of Node.js's event-driven architecture
- Used for creating and handling custom events

### 8. Buffer (buffer)
- For handling binary data
- Essential when working with file systems, networking, etc.
- Provides methods for converting between buffers and other formats

### 9. Stream (stream)
- For working with streaming data
- Efficient handling of reading/writing large amounts of data
- Different types: Readable, Writable, Duplex, and Transform streams

### 10. Crypto (crypto)
- For cryptographic functionality
- Provides methods for encryption, decryption, hashing, etc.
- Essential for implementing security features

## Examples in This Folder

In this folder, you'll find practical examples for several core modules:

- `fs-examples.js` - File system operations
- `path-example.js` - Path manipulation
- `http-server.js` - Creating a basic HTTP server
- `os-example.js` - Operating system information
- `events-example.js` - Using the EventEmitter

Each file includes detailed comments explaining the concepts and how the code works.

## How to Run Examples

To run any example, use the `node` command followed by the filename:

```bash
node fs-examples.js
node http-server.js
```

## Next Steps

After exploring these core modules, you'll have a solid foundation to build Node.js applications. The next section will cover modules and exports, which will help you organize your own code into reusable modules.

Happy coding!
