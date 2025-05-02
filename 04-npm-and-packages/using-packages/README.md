# Using npm Packages

This guide demonstrates how to use various npm packages in your Node.js applications.

## Getting Started with Packages

Before using packages, you need to install them:

```bash
# Install a single package
npm install package-name

# Install multiple packages
npm install package1 package2 package3

# Install a package as a dev dependency
npm install package-name --save-dev
```

## Importing Packages

### In CommonJS (Traditional Node.js)

```javascript
// Import the entire package
const express = require('express');

// Import specific parts of a package
const { useState, useEffect } = require('react');

// Import with alias
const _ = require('lodash');
```

### In ES Modules

```javascript
// Import the entire package
import express from 'express';

// Import specific parts of a package
import { useState, useEffect } from 'react';

// Import with alias
import * as _ from 'lodash';
```

## Common Packages and Their Uses

This directory contains examples of how to use popular npm packages in different scenarios.

### HTTP Requests and APIs

- **axios**: Modern HTTP client for making requests
- **node-fetch**: Lightweight fetch API implementation for Node.js
- **request**: Classic HTTP client (deprecated but still widely used)

### Utilities

- **lodash**: Utility library with helpful functions for manipulating data
- **moment**: Date and time formatting and manipulation
- **uuid**: Generate unique identifiers

### Command Line

- **chalk**: Terminal string styling (colors, formatting)
- **commander**: Command-line interface creation
- **inquirer**: Interactive command line prompts

### File System

- **fs-extra**: Extended file system methods beyond the Node.js built-in fs
- **glob**: Pattern matching for files
- **rimraf**: Deep deletion of files and directories

### Configuration

- **dotenv**: Load environment variables from .env files
- **config**: Hierarchical configurations for your app
- **cross-env**: Set environment variables across platforms

### Web Development

- **express**: Web framework for creating servers and APIs
- **socket.io**: Real-time bidirectional event-based communication
- **cors**: CORS middleware for Express


## Best Practices

### Importing Packages

- Only import what you need (use destructuring)
- Use consistent import styles throughout your project
- Consider the impact of large packages on performance

### Managing Dependencies

- Regularly update dependencies with `npm update`
- Check for outdated or vulnerable packages with `npm outdated` and `npm audit`
- Use package-lock.json to ensure consistent installations

### Documentation

- Read the documentation before using a package
- Check the GitHub repository for issues and activity
- Look for packages with good documentation and examples

## Learn More

- [npm Docs: Working with packages](https://docs.npmjs.com/cli/v9/using-npm/packages)
- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)
- [npm Website](https://www.npmjs.com) to search for packages 