// usage.js - Demonstrates how to use the different module patterns

/**
 * This file shows how to import and use the different module design patterns
 * demonstrated in the logger.js module.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Importing different types of exports
 * 2. Working with different module patterns
 * 3. Understanding the benefits of each pattern
 */

// Import everything from the logger module
const logger = require('./logger');

console.log('------ MODULE PATTERNS DEMO ------');

/**
 * PATTERN 1: BASIC OBJECT USAGE
 * 
 * Simple to use but doesn't support instances or private state.
 */
console.log('\n1. Using the Basic Object Pattern:');
logger.basicLogger.info('This is an info message');
logger.basicLogger.error('This is an error message');
logger.basicLogger.warn('This is a warning message');

/**
 * PATTERN 2: CONSTRUCTOR FUNCTION USAGE
 * 
 * Allows creating multiple instances, each with their own state.
 * Uses 'new' keyword which is a common source of bugs if forgotten.
 */
console.log('\n2. Using the Constructor Pattern:');

// Create instances using the 'new' keyword
const appLogger = new logger.Logger('AppLogger');
const dbLogger = new logger.Logger('DBLogger');

appLogger.log('Application started');
appLogger.log('Processing user input');
dbLogger.log('Connected to database');

console.log(`   AppLogger log count: ${appLogger.getLogCount()}`);
console.log(`   DBLogger log count: ${dbLogger.getLogCount()}`);

/**
 * PATTERN 3: FACTORY FUNCTION USAGE
 * 
 * Creates instances without 'new', provides encapsulation for private variables.
 * More flexible than constructors and supports configuration.
 */
console.log('\n3. Using the Factory Pattern:');

// Create loggers with different configurations
const prodLogger = logger.createLogger({
  name: 'ProductionLogger',
  level: 'error' // Only log errors in production
});

const devLogger = logger.createLogger({
  name: 'DevelopmentLogger',
  level: 'debug' // Log everything in development
});

// This will log because error level is always shown
prodLogger.error('Critical failure in payment processing');
// This won't log because info is below error level in production
prodLogger.info('User logged in'); 

// These will all log because debug level shows everything
devLogger.debug('Variable value: 42');
devLogger.info('Loading configuration');
devLogger.warn('Deprecated function called');
devLogger.error('Failed to connect to API');

console.log(`   ProdLogger name: ${prodLogger.getName()}`);
console.log(`   ProdLogger log count: ${prodLogger.getLogCount()}`);
console.log(`   DevLogger log count: ${devLogger.getLogCount()}`);

/**
 * Demonstrating Privacy in Factory Pattern
 * 
 * The factory pattern allows for truly private variables.
 */
console.log('\n   Factory Pattern Privacy:');
// We can access public methods
console.log(`   Can access public methods: ${typeof devLogger.getLogCount}`);

// But we can't access or modify private variables directly
console.log(`   Can't access private variables: ${typeof devLogger.logCount}`);
console.log(`   Can't access private functions: ${typeof devLogger.shouldLog}`);

/**
 * PATTERN 4: SINGLETON USAGE
 * 
 * Ensures only one instance exists across the application.
 * Good for services that should be shared.
 */
console.log('\n4. Using the Singleton Pattern:');

// Get the singleton instance
const logService1 = logger.singleton.getInstance();
logService1.log('info', 'First singleton usage');

// Get the "same" instance again
const logService2 = logger.singleton.getInstance();
logService2.log('warn', 'Second singleton usage');

// Both variables reference the same instance
const history = logService1.getHistory();
console.log('   Log history (from first reference):');
history.forEach(entry => console.log(`   ${entry}`));

// Clearing from one reference affects all references
logService2.clearHistory();
console.log(`   After clearing (from second reference): ${logService1.getHistory().length} entries`);

// Prove they are the same instance
console.log(`   Both references point to the same object: ${logService1 === logService2}`);

/**
 * PATTERN 5: SUBMODULES USAGE
 * 
 * Organizes related functionality into namespaced groups.
 * Good for utility libraries with many functions.
 */
console.log('\n5. Using the Submodules Pattern:');

// Access nested functionality through the namespaced structure
const jsonLog = logger.logUtils.format.asJson('error', 'Database connection failed');
console.log(`   JSON formatted log: ${jsonLog}`);

// Use the color formatter
console.log(logger.logUtils.format.withColor('info', 'User profile updated'));
console.log(logger.logUtils.format.withColor('warn', 'High memory usage detected'));
console.log(logger.logUtils.format.withColor('error', 'Service unavailable'));

// Use the analysis tools
const message = 'Multiple errors occurred during application startup';
console.log(`   Words in message: ${logger.logUtils.analysis.countWords(message)}`);
console.log(`   Contains error references: ${logger.logUtils.analysis.hasError(message)}`);

/**
 * SUMMARY OF PATTERNS
 * 
 * 1. Basic Object: Simple, but limited encapsulation
 * 2. Constructor: Supports instances, but requires 'new'
 * 3. Factory: Flexible, configurable, provides true privacy
 * 4. Singleton: Ensures a single shared instance
 * 5. Submodules: Organizes related functionality
 * 
 * Choose based on your specific needs!
 */
console.log('\nModule patterns demo complete!');

/**
 * Try to run this file with node:
 * node usage.js
 * 
 * You should see examples of each module pattern in action.
 */ 