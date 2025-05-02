# npm Scripts and Automation

This guide demonstrates how to use npm scripts to automate common development tasks and improve workflow efficiency.

## What Are npm Scripts?

npm scripts are defined in the `scripts` section of your `package.json` file. They allow you to:

- Automate repetitive tasks
- Standardize development workflows
- Provide shortcuts for complex commands
- Create build pipelines
- Run tests, linters, and other tools

## Basic npm Scripts

Here's a simple example of scripts in `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "test": "mocha tests/",
    "lint": "eslint ."
  }
}
```

You can run these scripts with:

```bash
npm start
npm test
npm run lint
```

> Note: `start` and `test` are special script names that can be run without the `run` command.

## Script Types and Shortcuts

npm provides several built-in script names with shortcuts:

- `npm start` → `npm run start`
- `npm test` or `npm t` → `npm run test` 
- `npm stop` → `npm run stop`
- `npm restart` → `npm run restart`

For any other scripts, use `npm run <script-name>`.

## Pre and Post Hooks

npm automatically runs scripts named `pre<script>` and `post<script>` before and after a script:

```json
{
  "scripts": {
    "prestart": "echo 'About to start...'",
    "start": "node index.js",
    "poststart": "echo 'Started successfully!'"
  }
}
```

Running `npm start` will:
1. First run `prestart`
2. Then run `start`
3. Finally run `poststart`

## Using Command Line Arguments

You can pass arguments to npm scripts:

```bash
npm run test -- --watch
```

The `--` separates npm's arguments from those passed to your script.

## Running Multiple Scripts

### Sequential Execution

Run scripts one after another using `&&`:

```json
{
  "scripts": {
    "build": "npm run clean && npm run compile && npm run bundle"
  }
}
```

### Parallel Execution

Run scripts simultaneously using `&` or the `npm-run-all` package:

```json
{
  "scripts": {
    "watch": "npm run watch:js & npm run watch:css"
  }
}
```

## Environment Variables

Access environment variables in your scripts:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js"
  }
}
```

For cross-platform compatibility, consider using `cross-env`:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js"
  }
}
```

## Common Use Cases

### Development Server

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Building Assets

```json
{
  "scripts": {
    "build:js": "webpack --config webpack.config.js",
    "build:css": "sass src/styles:dist/styles",
    "build": "npm run build:js && npm run build:css"
  }
}
```

### Testing

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Deployment

```json
{
  "scripts": {
    "deploy": "npm run test && npm run build && firebase deploy"
  }
}
```

## Advanced Techniques

### Using npm Packages in Scripts

You can use locally installed npm packages directly in your scripts without globally installing them:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write \"**/*.js\""
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^2.0.0"
  }
}
```

### Custom Scripts with JavaScript

For more complex scripts, you can create JavaScript files:

```javascript
// scripts/cleanup.js
const fs = require('fs');
const path = require('path');

// Delete the dist directory
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
  console.log('Dist directory cleaned');
}
```

Then in `package.json`:

```json
{
  "scripts": {
    "clean": "node scripts/cleanup.js"
  }
}
```

## Best Practices

1. **Document your scripts** in your README.md
2. **Keep scripts focused** on specific tasks
3. **Use descriptive names** like `build:dev` instead of cryptic ones
4. **Standardize naming conventions** across projects
5. **Use local dependencies** rather than requiring global installs
6. **Consider cross-platform compatibility** with tools like `cross-env`
7. **Break complex scripts** into smaller, reusable ones

## Examples in This Folder

This folder contains examples of practical npm scripts:

- `package.json`: Example scripts for various scenarios
- `scripts/`: Helper scripts for more complex operations
- Demo project files showing scripts in action

## Learn More

- [npm Docs: Scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) for running multiple scripts
- [cross-env](https://www.npmjs.com/package/cross-env) for cross-platform environment variables 