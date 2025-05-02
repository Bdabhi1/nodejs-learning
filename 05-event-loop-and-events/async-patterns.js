/**
 * ASYNCHRONOUS PATTERNS WITH EVENTS
 * 
 * This file demonstrates common asynchronous programming patterns
 * in Node.js using events. These patterns help you write efficient,
 * non-blocking code that's essential for performant Node.js applications.
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

console.log('🔄 ASYNCHRONOUS PATTERNS WITH EVENTS 🔄\n');

// ========================================================
// PART 1: EVENTS VS CALLBACKS
// ========================================================

console.log('📚 PART 1: Events vs Callbacks');

/**
 * Node.js originally used callbacks for async operations,
 * but events offer advantages for certain scenarios:
 * 
 * 1. Multiple responses over time (vs. one response with callbacks)
 * 2. Multiple listeners (vs. one callback)
 * 3. Loose coupling between components
 */

// Let's compare both approaches with a file watcher example

console.log('Creating a simple file watcher...');

// Path to a sample file we'll be monitoring
const sampleFilePath = path.join(__dirname, 'sample-file.txt');

// Create the file if it doesn't exist
if (!fs.existsSync(sampleFilePath)) {
  fs.writeFileSync(sampleFilePath, 'Initial content');
  console.log('Created sample file for monitoring');
}

// Callback-based approach
console.log('\nCallback-based approach:');

/**
 * fs.watchFile uses callbacks:
 * - Simpler for one-time operations
 * - But harder to extend and maintain for complex use cases
 */
fs.watchFile(sampleFilePath, (curr, prev) => {
  console.log('Callback: File was modified');
  console.log(`  Size changed from ${prev.size} to ${curr.size} bytes`);
});

// Event-based approach
console.log('\nEvent-based approach:');

/**
 * fs.watch uses events:
 * - More flexible
 * - Can add multiple listeners
 * - Can handle different types of events
 */
const watcher = fs.watch(sampleFilePath);

// Listen for file change events
watcher.on('change', (eventType, filename) => {
  console.log(`Event: File ${filename} triggered a "${eventType}" event`);
});

// Listen for errors
watcher.on('error', (error) => {
  console.error(`Watcher error: ${error.message}`);
});

// Let's modify the file to trigger both watchers
setTimeout(() => {
  fs.appendFileSync(sampleFilePath, '\nUpdated content');
  console.log('\nModified the file to trigger watchers\n');
}, 1000);

// ========================================================
// PART 2: ASYNC DATA PROCESSING WITH EVENTS
// ========================================================

console.log('\n📚 PART 2: Async Data Processing with Events');

/**
 * Events are great for handling asynchronous data streams
 * like user actions, data chunks, or network events
 */

class DataProcessor extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
    this.processed = 0;
  }
  
  /**
   * Process data asynchronously in chunks and emit events
   * as progress is made
   */
  processData() {
    console.log('Starting data processing...');
    
    // Emit the 'start' event
    this.emit('start', this.data.length);
    
    // Process data in chunks asynchronously
    this._processNextChunk(0);
    
    return this; // For chaining method calls
  }
  
  /**
   * Recursive function to process the next chunk of data
   * @private
   */
  _processNextChunk(index) {
    // Base case - we've processed all items
    if (index >= this.data.length) {
      // We're done processing
      this.emit('complete', this.processed);
      return;
    }
    
    const item = this.data[index];
    
    // Simulate an async operation with setTimeout
    setTimeout(() => {
      // Process the current item
      const result = this._processItem(item);
      
      // Emit a 'data' event with the processed item
      this.emit('data', result, index);
      
      this.processed++;
      
      // Emit a 'progress' event
      const progress = Math.round((this.processed / this.data.length) * 100);
      this.emit('progress', progress);
      
      // Process the next chunk
      this._processNextChunk(index + 1);
    }, 200); // Simulate processing time
  }
  
  /**
   * Process a single data item
   * @private
   */
  _processItem(item) {
    // Simple example: uppercase the item if it's a string
    return typeof item === 'string' ? item.toUpperCase() : item;
  }
}

// Create sample data
const sampleData = [
  'apple',
  'banana',
  'cherry',
  'date',
  'elderberry'
];

// Create processor instance
const processor = new DataProcessor(sampleData);

// Register event listeners
processor.on('start', (totalItems) => {
  console.log(`Processing started with ${totalItems} items`);
});

processor.on('data', (result, index) => {
  console.log(`Processed item ${index}: ${result}`);
});

processor.on('progress', (percent) => {
  const bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));
  console.log(`Progress: ${bar} ${percent}%`);
});

processor.on('complete', (totalProcessed) => {
  console.log(`Processing complete! Processed ${totalProcessed} items`);
});

// Start processing
processor.processData();

// ========================================================
// PART 3: ASYNC CONTROL FLOW WITH EVENTS
// ========================================================

console.log('\n📚 PART 3: Async Control Flow with Events');

/**
 * Events can help manage complex async operations and control flow
 */

class AsyncTask extends EventEmitter {
  constructor(name, shouldSucceed = true) {
    super();
    this.name = name;
    this.shouldSucceed = shouldSucceed;
  }
  
  execute() {
    console.log(`Task "${this.name}" starting...`);
    
    // Emit 'start' event
    this.emit('start', this.name);
    
    // Simulate an async task with setTimeout
    setTimeout(() => {
      if (this.shouldSucceed) {
        // Task completed successfully
        this.emit('success', `Task "${this.name}" completed successfully`);
      } else {
        // Task failed
        const error = new Error(`Task "${this.name}" failed`);
        this.emit('error', error);
      }
      
      // In both cases, the task is done
      this.emit('end', this.name);
    }, 1000);
    
    return this; // For chaining
  }
}

/**
 * TaskManager that manages a series of async tasks
 */
class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
    this.currentIndex = 0;
    this.results = [];
    this.errors = [];
  }
  
  addTask(task) {
    this.tasks.push(task);
    return this;
  }
  
  // Run tasks sequentially
  runSequential() {
    console.log('\nRunning tasks sequentially...');
    this.emit('start', this.tasks.length);
    this._runNextTask();
    return this;
  }
  
  // Run tasks in parallel
  runParallel() {
    console.log('\nRunning tasks in parallel...');
    this.emit('start', this.tasks.length);
    
    this.tasks.forEach((task, index) => {
      // Set up event handlers for this task
      this._setupTaskListeners(task, index);
      
      // Execute the task
      task.execute();
    });
    
    return this;
  }
  
  // Private method to run the next task in sequence
  _runNextTask() {
    if (this.currentIndex >= this.tasks.length) {
      // All tasks are complete
      this.emit('complete', {
        results: this.results,
        errors: this.errors
      });
      return;
    }
    
    const task = this.tasks[this.currentIndex];
    const index = this.currentIndex;
    
    // Set up event handlers for this task
    this._setupTaskListeners(task, index);
    
    // Execute the task
    task.execute();
  }
  
  // Private method to set up event listeners for a task
  _setupTaskListeners(task, index) {
    // Handle successful task completion
    task.once('success', (result) => {
      this.results[index] = result;
      this.emit('taskCompleted', task.name, result);
      
      // If we're running sequentially, move to the next task
      if (this.runningSequentially) {
        this.currentIndex++;
        this._runNextTask();
      }
      
      // Check if all tasks are complete (for parallel execution)
      this._checkAllComplete();
    });
    
    // Handle task error
    task.once('error', (error) => {
      this.errors[index] = error;
      this.emit('taskError', task.name, error);
      
      // If we're running sequentially, move to the next task
      if (this.runningSequentially) {
        this.currentIndex++;
        this._runNextTask();
      }
      
      // Check if all tasks are complete (for parallel execution)
      this._checkAllComplete();
    });
  }
  
  // Private method to check if all tasks are complete (for parallel execution)
  _checkAllComplete() {
    const totalCompleted = this.results.filter(r => r !== undefined).length + 
                           this.errors.filter(e => e !== undefined).length;
    
    if (totalCompleted === this.tasks.length) {
      this.emit('complete', {
        results: this.results,
        errors: this.errors
      });
    }
  }
  
  // Getter to determine if we're running in sequential mode
  get runningSequentially() {
    return this._runningSequentially;
  }
  
  // Setter to update the running mode
  set runningSequentially(value) {
    this._runningSequentially = value;
  }
}

// Create some tasks
const task1 = new AsyncTask('Read file', true);
const task2 = new AsyncTask('Process data', true);
const task3 = new AsyncTask('Save results', false); // This one will fail
const task4 = new AsyncTask('Send notification', true);

// Create a task manager for sequential execution
const sequentialManager = new TaskManager();
sequentialManager._runningSequentially = true;

// Add tasks
sequentialManager
  .addTask(task1)
  .addTask(task2)
  .addTask(task3)
  .addTask(task4);

// Set up event listeners for the manager
sequentialManager.on('start', (taskCount) => {
  console.log(`Starting to execute ${taskCount} tasks`);
});

sequentialManager.on('taskCompleted', (taskName, result) => {
  console.log(`✅ ${taskName} completed with result: ${result}`);
});

sequentialManager.on('taskError', (taskName, error) => {
  console.log(`❌ ${taskName} failed with error: ${error.message}`);
});

sequentialManager.on('complete', (results) => {
  console.log(`All tasks finished. Successful: ${results.results.filter(Boolean).length}, Failed: ${results.errors.filter(Boolean).length}`);
});

// Run the tasks sequentially
sequentialManager.runSequential();

// Note: In a real app, you might want to use Promises or async/await for complex async flows
// But events remain useful for scenarios with multiple listeners or streaming data

// ========================================================
// CONCLUSION
// ========================================================

setTimeout(() => {
  console.log('\n📝 Key takeaways on async patterns with events:');
  console.log('1. Events are great for situations with multiple responses over time');
  console.log('2. They allow multiple listeners to respond to the same signal');
  console.log('3. Events create loose coupling between components');
  console.log('4. They can be combined with other async patterns like Promises');
  console.log('5. Events are at the core of Node.js streaming API');
  
  // Clean up file watchers and sample file
  watcher.close();
  fs.unwatchFile(sampleFilePath);
  fs.unlinkSync(sampleFilePath);
  console.log('\nCleaned up file watchers and sample file');
}, 8000); // Wait for all demos to complete 