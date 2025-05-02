# Node.js Basics

Welcome to your first steps in Node.js! This guide is designed for absolute beginners who want to learn Node.js from scratch.

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code outside of a web browser, enabling server-side programming with JavaScript.

Key characteristics of Node.js:
- **Event-driven architecture** - Operations are performed asynchronously
- **Non-blocking I/O model** - Makes it lightweight and efficient
- **JavaScript-based** - Uses the same language for both frontend and backend

## Prerequisites

Before getting started with Node.js, make sure you have:
- Basic understanding of JavaScript
- A text editor (VS Code, Sublime Text, etc.)
- Command line/terminal familiarity

## Installation

### For Windows:
1. Go to [Node.js official website](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the instructions
4. Verify installation by opening Command Prompt and typing:
   ```
   node -v
   npm -v
   ```

### For macOS:
1. Go to [Node.js official website](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the instructions
4. Alternatively, install via Homebrew:
   ```
   brew install node
   ```
5. Verify installation:
   ```
   node -v
   npm -v
   ```

### For Linux:
1. Using package manager:
   ```
   # For Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm

   # For Fedora
   sudo dnf install nodejs

   # For Arch Linux
   sudo pacman -S nodejs npm
   ```
2. Verify installation:
   ```
   node -v
   npm -v
   ```

## Your First Node.js Program

In this folder, you'll find a simple example: `hello-world.js`. Let's understand what it does:

1. Create a new file called `hello-world.js`
2. Add basic JavaScript code
3. Run it using the Node.js runtime

## Node.js REPL

Node.js comes with a REPL (Read-Eval-Print Loop) environment, which is an interactive shell where you can write JavaScript code and see the results immediately.

To start the REPL, simply type `node` in your terminal:

```
$ node
> console.log('Hello, World!')
Hello, World!
undefined
> 
```

Type `.exit` or press Ctrl+C twice to exit the REPL.

## Basic Concepts Covered in Examples

The example files in this folder demonstrate:
1. Running JavaScript with Node.js
2. Working with modules and the module system
3. Using global objects like `console`, `process`, etc.
4. Understanding asynchronous programming basics

## Next Steps

After mastering these basics, you can proceed to the next folder in this learning path to explore more advanced Node.js concepts like core modules, npm packages, and more.

Happy coding!
