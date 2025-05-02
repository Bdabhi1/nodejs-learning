// logger.js - Demonstrates common module design patterns in Node.js

/**
 * This module demonstrates several common design patterns used for Node.js modules.
 * These patterns show different ways to structure and expose module functionality.
 * 
 * IMPORTANT CONCEPTS:
 * 1. Factory Pattern: Functions that create and return objects
 * 2. Configuration: Making modules configurable
 * 3. Revealing Module Pattern: Selectively exposing functions/properties
 */

/**
 * PATTERN 1: BASIC OBJECT
 * 
 * The simplest pattern - just export an object with methods.
 * All methods are public and share the same context.
 */
exports.basicLogger = {
  log: function(message) {
    console.log(`[LOG] ${message}`);
  },
  
  error: function(message) {
    console.error(`[ERROR] ${message}`);
  },
  
  warn: function(message) {
    console.warn(`[WARN] ${message}`);
  },
  
  info: function(message) {
    console.info(`[INFO] ${message}`);
  }
};

/**
 * PATTERN 2: CONSTRUCTOR FUNCTION
 * 
 * Export a constructor function that creates instances.
 * Each instance has its own state.
 */
function Logger(name) {
  // Instance properties
  this.name = name;
  this.logCount = 0;
  
  // Instance methods
  this.log = function(message) {
    this.logCount++;
    console.log(`[${this.name}] ${message}`);
  };
  
  this.getLogCount = function() {
    return this.logCount;
  };
}

exports.Logger = Logger;

/**
 * PATTERN 3: FACTORY FUNCTION
 * 
 * Export a function that creates and returns objects.
 * Allows for private variables through closures.
 * This is often preferred over constructors in modern JavaScript.
 */
exports.createLogger = function(options = {}) {
  // Private variables (not accessible outside this function)
  const name = options.name || 'DefaultLogger';
  const level = options.level || 'info';
  let logCount = 0;
  
  // Levels and their numeric values for comparison
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };
  
  // Private function
  function shouldLog(messageLevel) {
    return levels[messageLevel] <= levels[level];
  }
  
  // Return an object with public methods only
  return {
    // Public methods that can access private variables
    debug: function(message) {
      if (shouldLog('debug')) {
        logCount++;
        console.log(`[${name}] [DEBUG] ${message}`);
      }
    },
    
    info: function(message) {
      if (shouldLog('info')) {
        logCount++;
        console.log(`[${name}] [INFO] ${message}`);
      }
    },
    
    warn: function(message) {
      if (shouldLog('warn')) {
        logCount++;
        console.warn(`[${name}] [WARN] ${message}`);
      }
    },
    
    error: function(message) {
      if (shouldLog('error')) {
        logCount++;
        console.error(`[${name}] [ERROR] ${message}`);
      }
    },
    
    getLogCount: function() {
      return logCount;
    },
    
    getName: function() {
      return name;
    },
    
    // We don't expose a way to modify the private variables directly
  };
};

/**
 * PATTERN 4: SINGLETON
 * 
 * Export a single instance of an object.
 * Useful when you want exactly one instance across your application.
 */
exports.singleton = (function() {
  // Private variables and functions
  let instance;
  let logHistory = [];
  
  function initialize() {
    // Private methods
    function formatMessage(level, message) {
      return `[${level.toUpperCase()}] [${new Date().toISOString()}] ${message}`;
    }
    
    // Public interface
    return {
      log: function(level, message) {
        const formattedMessage = formatMessage(level, message);
        logHistory.push(formattedMessage);
        console.log(formattedMessage);
      },
      
      getHistory: function() {
        return [...logHistory]; // Return a copy to prevent direct modification
      },
      
      clearHistory: function() {
        logHistory = [];
        return 'Log history cleared';
      }
    };
  }
  
  return {
    // This ensures only one instance is created
    getInstance: function() {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    }
  };
})();

/**
 * PATTERN 5: SUBMODULES
 * 
 * Export an object with nested structure for related functionality.
 * Good for organizing related functions into logical groups.
 */
exports.logUtils = {
  // Formatting submodule
  format: {
    asJson: function(level, message) {
      return JSON.stringify({
        level: level,
        message: message,
        timestamp: new Date().toISOString()
      });
    },
    
    withColor: function(level, message) {
      const colors = {
        error: '\x1b[31m', // Red
        warn: '\x1b[33m',  // Yellow
        info: '\x1b[36m',  // Cyan
        debug: '\x1b[90m', // Gray
        reset: '\x1b[0m'   // Reset
      };
      
      return `${colors[level] || ''}[${level.toUpperCase()}] ${message}${colors.reset}`;
    }
  },
  
  // Analysis submodule
  analysis: {
    countWords: function(message) {
      return message.split(/\s+/).length;
    },
    
    hasError: function(message) {
      return /error|fail|exception/i.test(message);
    }
  }
};

/**
 * To import and use these different patterns, see usage.js
 */ 