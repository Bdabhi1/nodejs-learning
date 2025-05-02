// events-example.js - Events Module Examples

/**
 * The 'events' module is one of the most fundamental modules in Node.js.
 * It provides the EventEmitter class, which is the backbone of Node.js's
 * event-driven architecture.
 * 
 * Event-driven programming is a paradigm where the flow of the program is
 * determined by events (user actions, sensor outputs, messages from other programs, etc.)
 * 
 * Key concepts:
 * - Events: Things that happen that our program can respond to
 * - Event Emitters: Objects that emit named events
 * - Event Listeners: Functions that are executed when a specific event occurs
 * 
 * Many built-in Node.js objects are instances of EventEmitter, including:
 * - HTTP servers
 * - Streams
 * - Process objects
 */

// Import the events module
const EventEmitter = require('events');

console.log('------ EVENTS MODULE DEMO ------');

// SECTION 1: CREATING A BASIC EVENT EMITTER

/**
 * Creating an Event Emitter
 * 
 * The EventEmitter class is used to create objects that can emit events.
 * We typically create our own class that extends EventEmitter.
 */
console.log('\n1. Creating a basic Event Emitter:');

// Create a simple event emitter instance
const myEmitter = new EventEmitter();

/**
 * Adding an Event Listener
 * 
 * The 'on' method is used to register event listeners.
 * Parameters:
 * - event: The name of the event to listen for
 * - listener: The callback function to execute when the event occurs
 */
myEmitter.on('event', () => {
  console.log('   An event occurred!');
});

// Emit the event
console.log('   Emitting an event...');
myEmitter.emit('event');

// SECTION 2: EVENT EMITTER WITH PARAMETERS

/**
 * Event Listeners can receive parameters when events are emitted
 */
console.log('\n2. Event Emitter with parameters:');

// Add a listener that accepts parameters
myEmitter.on('greet', (name) => {
  console.log(`   Hello, ${name}!`);
});

// Emit the event with a parameter
console.log('   Emitting a greet event with parameter...');
myEmitter.emit('greet', 'John');

// You can pass multiple parameters
myEmitter.on('calculate', (x, y) => {
  console.log(`   Sum: ${x + y}, Product: ${x * y}`);
});

console.log('   Emitting a calculate event with multiple parameters...');
myEmitter.emit('calculate', 5, 3);

// SECTION 3: CREATING A CUSTOM EVENT EMITTER CLASS

/**
 * Creating a Custom EventEmitter Class
 * 
 * In real applications, you'll typically create your own class
 * that extends EventEmitter and adds custom behavior.
 */
console.log('\n3. Creating a custom Event Emitter class:');

// Define a custom class that extends EventEmitter
class MyApp extends EventEmitter {
  constructor() {
    // Call the parent constructor
    super();
    // Initialize properties
    this.isRunning = false;
  }
  
  // A method that emits events
  start() {
    console.log('   Application starting...');
    
    // Emit a 'starting' event
    this.emit('starting');
    
    // Set state
    this.isRunning = true;
    
    // Emit a 'started' event with the current timestamp
    this.emit('started', new Date());
  }
  
  process(data) {
    console.log(`   Processing data: ${data}`);
    
    // Emit a 'processing' event with the data
    this.emit('processing', data);
    
    // Simulate some processing
    const result = data.toUpperCase();
    
    // Emit a 'processed' event with the result
    this.emit('processed', result);
    
    return result;
  }
  
  stop() {
    console.log('   Application stopping...');
    
    // Emit a 'stopping' event
    this.emit('stopping');
    
    // Set state
    this.isRunning = false;
    
    // Emit a 'stopped' event
    this.emit('stopped');
  }
}

// Create an instance of our custom EventEmitter
const app = new MyApp();

// Add event listeners for the various events
app.on('starting', () => {
  console.log('   Event: Application is starting up');
});

app.on('started', (timestamp) => {
  console.log(`   Event: Application started at ${timestamp}`);
});

app.on('processing', (data) => {
  console.log(`   Event: Processing data: "${data}"`);
});

app.on('processed', (result) => {
  console.log(`   Event: Data processed, result: "${result}"`);
});

app.on('stopping', () => {
  console.log('   Event: Application is stopping');
});

app.on('stopped', () => {
  console.log('   Event: Application has stopped');
});

// Use our custom event emitter
app.start();
const result = app.process('hello world');
app.stop();

// SECTION 4: ADVANCED EVENT EMITTER FEATURES

/**
 * The EventEmitter class has several advanced features
 */
console.log('\n4. Advanced Event Emitter features:');

// Create a new emitter for these examples
const advancedEmitter = new EventEmitter();

/**
 * Once Method: Add a one-time listener
 * The listener will be invoked only the first time the event is emitted
 */
console.log('\n   4.1 Once method (one-time listener):');

advancedEmitter.once('oneTimeEvent', () => {
  console.log('   This listener will only be called once');
});

console.log('   Emitting oneTimeEvent first time...');
advancedEmitter.emit('oneTimeEvent');

console.log('   Emitting oneTimeEvent second time...');
advancedEmitter.emit('oneTimeEvent'); // Nothing happens this time

/**
 * Error Event: The 'error' event is special
 * If no listener is registered, Node.js throws the error and crashes
 */
console.log('\n   4.2 Error event handling:');

advancedEmitter.on('error', (err) => {
  console.error(`   Error handled: ${err.message}`);
  // This prevents Node.js from crashing
});

// Emit an error event
advancedEmitter.emit('error', new Error('Something went wrong!'));

/**
 * Multiple Listeners: You can add multiple listeners for the same event
 * They will be called in the order they were registered
 */
console.log('\n   4.3 Multiple listeners:');

advancedEmitter.on('multipleListeners', () => {
  console.log('   First listener called');
});

advancedEmitter.on('multipleListeners', () => {
  console.log('   Second listener called');
});

advancedEmitter.on('multipleListeners', () => {
  console.log('   Third listener called');
});

console.log('   Emitting multipleListeners event...');
advancedEmitter.emit('multipleListeners');

/**
 * EventEmitter methods for managing listeners
 */
console.log('\n   4.4 Managing listeners:');

// Function to use as a listener
function myListener() {
  console.log('   Listener was called');
}

// Add the listener
advancedEmitter.on('managedEvent', myListener);

// Get the number of listeners for an event
console.log(`   Number of listeners for 'managedEvent': ${advancedEmitter.listenerCount('managedEvent')}`);

// Remove the listener
console.log('   Removing the listener...');
advancedEmitter.removeListener('managedEvent', myListener);
// Alternatively: advancedEmitter.off('managedEvent', myListener); // alias in newer Node.js versions

console.log(`   Number of listeners after removal: ${advancedEmitter.listenerCount('managedEvent')}`);

/**
 * Get all registered events
 */
console.log('\n   4.5 Getting all event names:');
console.log('   Events registered on advancedEmitter:', advancedEmitter.eventNames());

// SECTION 5: PRACTICAL EXAMPLE - TASK MANAGER

/**
 * A practical example of using EventEmitter for a simple task manager
 */
console.log('\n5. Practical Example - Task Manager:');

class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }
  
  addTask(task) {
    const taskId = this.tasks.length + 1;
    const newTask = {
      id: taskId,
      name: task,
      completed: false,
      createdAt: new Date()
    };
    
    this.tasks.push(newTask);
    this.emit('taskAdded', newTask);
    return taskId;
  }
  
  completeTask(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      this.emit('error', new Error(`Task with ID ${taskId} not found`));
      return false;
    }
    
    this.tasks[taskIndex].completed = true;
    this.tasks[taskIndex].completedAt = new Date();
    
    this.emit('taskCompleted', this.tasks[taskIndex]);
    return true;
  }
  
  listTasks() {
    this.emit('listingTasks', this.tasks);
    return this.tasks;
  }
}

// Create a task manager instance
const taskManager = new TaskManager();

// Add event listeners
taskManager.on('taskAdded', (task) => {
  console.log(`   Event: Task "${task.name}" (ID: ${task.id}) has been added`);
});

taskManager.on('taskCompleted', (task) => {
  console.log(`   Event: Task "${task.name}" (ID: ${task.id}) has been completed`);
});

taskManager.on('listingTasks', (tasks) => {
  console.log('   Event: Listing all tasks');
  console.log(`   Total tasks: ${tasks.length}`);
});

taskManager.on('error', (error) => {
  console.error(`   Event: Error occurred: ${error.message}`);
});

// Use the task manager
console.log('\n   Using the task manager:');
taskManager.addTask('Learn Node.js');
taskManager.addTask('Understand Event Emitters');
const taskId = taskManager.addTask('Complete this tutorial');

// Complete a task
taskManager.completeTask(taskId);

// Try to complete a non-existent task
taskManager.completeTask(999);

// List all tasks
const tasks = taskManager.listTasks();
console.log('\n   Current tasks:');
tasks.forEach(task => {
  console.log(`   - [${task.completed ? 'X' : ' '}] ${task.name} (ID: ${task.id})`);
});

console.log('\nEvents module demo complete!');

/**
 * Key Takeaways about Event-Driven Programming in Node.js:
 * 
 * 1. The event-driven architecture is one of Node.js's core strengths
 * 2. EventEmitter is the foundation of many Node.js components
 * 3. It allows for asynchronous, non-blocking code execution
 * 4. By extending EventEmitter, you can create your own event-based components
 * 5. Event listeners should be kept lightweight to maintain performance
 * 
 * To run this file, use:
 * node events-example.js
 */ 