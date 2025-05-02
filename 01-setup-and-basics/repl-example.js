// repl-example.js - Detailed guide to using Node.js REPL

/**
 * NODE.JS REPL (READ-EVAL-PRINT LOOP)
 * 
 * The Node.js REPL is an interactive programming environment that allows you to:
 * - Read: Read user input
 * - Eval: Evaluate the input
 * - Print: Display the result
 * - Loop: Repeat the process
 * 
 * This file shows examples of what you can do in the Node.js REPL.
 */

/**
 * HOW TO START THE REPL:
 * 
 * Just type 'node' in your terminal/command prompt and press Enter:
 * $ node
 * >
 * 
 * The '>' symbol indicates that the REPL is ready for your input.
 */

/**
 * BASIC REPL EXAMPLES:
 * 
 * 1. Simple arithmetic operations:
 * > 2 + 2
 * 4
 * > 10 * 5
 * 50
 * > 8 / 4
 * 2
 * 
 * 2. Variable declarations:
 * > let name = "Node.js"
 * undefined
 * > name
 * 'Node.js'
 * > const version = 16
 * undefined
 * > version
 * 16
 * 
 * 3. JavaScript expressions:
 * > const numbers = [1, 2, 3, 4, 5]
 * undefined
 * > numbers.map(n => n * 2)
 * [ 2, 4, 6, 8, 10 ]
 * > "Hello".toUpperCase()
 * 'HELLO'
 * 
 * 4. Multi-line expressions:
 * > function add(a, b) {
 * ... return a + b;
 * ... }
 * undefined
 * > add(3, 5)
 * 8
 * 
 * Notice how the prompt changes from '>' to '...' for multi-line inputs.
 */

/**
 * SPECIAL REPL COMMANDS:
 * 
 * These commands start with a dot (.) and provide special functionality:
 * 
 * .help    - Display help information
 * .exit    - Exit the REPL (same as pressing Ctrl+D)
 * .break   - Exit from a multi-line expression
 * .clear   - Clear the REPL context
 * .save    - Save the current REPL session to a file
 * .load    - Load a file into the current REPL session
 * .editor  - Enter editor mode (Ctrl+D to finish, Ctrl+C to cancel)
 */

/**
 * ACCESSING PREVIOUS RESULTS:
 * 
 * The REPL stores the result of the last expression in the special variable '_'
 * 
 * > 2 + 3
 * 5
 * > _ * 2
 * 10
 */

/**
 * USING NODE.JS CORE MODULES:
 * 
 * You can use require() to import modules directly in the REPL:
 * 
 * > const fs = require('fs')
 * undefined
 * > fs.readdirSync('.')
 * [ 'hello-world.js', 'modules-intro.js', 'README.md', 'repl-example.js' ]
 * 
 * > const os = require('os')
 * undefined
 * > os.platform()
 * 'linux' (or whatever your OS is)
 */

/**
 * GLOBAL OBJECTS IN REPL:
 * 
 * All Node.js global objects are available in the REPL:
 * 
 * > console.log('Hello REPL')
 * Hello REPL
 * undefined
 * 
 * > process.version
 * 'v16.14.0' (or whatever your Node.js version is)
 * 
 * > setTimeout(() => console.log('Delayed message'), 1000)
 * Timeout object
 * (after 1 second) Delayed message
 */

/**
 * Tab Completion:
 * 
 * The REPL supports tab completion. Try typing part of a variable name or method and press Tab:
 * 
 * > const user = { name: 'John', age: 30 }
 * undefined
 * > user. (press Tab here)
 * user.__defineGetter__      user.__defineSetter__      user.__lookupGetter__
 * user.__lookupSetter__      user.__proto__             user.constructor
 * user.hasOwnProperty        user.isPrototypeOf         ...etc...
 * 
 * This helps you discover available methods and properties.
 */

/**
 * NOTE: This is not a file to execute - it's a guide with examples for using the Node.js REPL.
 * To practice, simply start the REPL by typing 'node' in your terminal and try these examples.
 */ 