/**
 * CUSTOM EVENTS IN NODE.JS
 * 
 * This file demonstrates how to create and use custom events in Node.js
 * using the built-in EventEmitter class. Events are a powerful way
 * to create communication between different parts of your application.
 */

// First, we need to import the 'events' module from Node.js
const EventEmitter = require('events');

console.log('🌟 CUSTOM EVENTS DEMONSTRATION 🌟\n');

// ========================================================
// PART 1: CREATING A BASIC EVENT EMITTER
// ========================================================

console.log('📚 PART 1: Basic EventEmitter');

// Create a new EventEmitter instance
const myEmitter = new EventEmitter();

/**
 * REGISTERING EVENT LISTENERS
 * 
 * The 'on' method registers a listener function that will be called
 * whenever the specified event is emitted
 */

// Let's register a listener for a custom 'greeting' event
myEmitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`);
});

// We can have multiple listeners for the same event
myEmitter.on('greeting', (name) => {
  console.log(`How are you doing today, ${name}?`);
});

// Register a listener for another event
myEmitter.on('farewell', (name) => {
  console.log(`Goodbye, ${name}! See you next time.`);
});

/**
 * EMITTING EVENTS
 * 
 * The 'emit' method triggers an event, calling all listeners 
 * registered for that event, passing any provided arguments
 */

console.log('Emitting greeting event:');
// Emit the 'greeting' event with the name 'John' as an argument
myEmitter.emit('greeting', 'John');

console.log('\nEmitting farewell event:');
// Emit the 'farewell' event
myEmitter.emit('farewell', 'John');

// If we emit an event with no listeners, nothing happens
console.log('\nEmitting event with no listeners:');
myEmitter.emit('unknown-event', 'This will not be logged');
console.log('Nothing happened with the unknown event');

// ========================================================
// PART 2: CREATING A CUSTOM CLASS WITH EVENT EMITTER
// ========================================================

console.log('\n📚 PART 2: Custom Class with EventEmitter');

/**
 * Let's create a more realistic example - a TaskManager class that
 * extends EventEmitter to notify listeners about task events
 */

// Create a class that inherits from EventEmitter
class TaskManager extends EventEmitter {
  constructor() {
    // Always call super() first when extending a class
    super();
    
    this.tasks = [];
  }
  
  /**
   * Add a task and emit an event
   */
  addTask(task) {
    this.tasks.push(task);
    
    // Emit an event when a task is added
    // We can pass multiple arguments to the event listeners
    this.emit('taskAdded', task, this.tasks.length);
  }
  
  /**
   * Complete a task and emit an event
   */
  completeTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      const task = this.tasks[taskIndex];
      
      // Mark the task as completed
      task.completed = true;
      
      // Emit an event when a task is completed
      this.emit('taskCompleted', task);
      
      // Check if all tasks are completed
      const allCompleted = this.tasks.every(task => task.completed);
      if (allCompleted) {
        // Emit an event when all tasks are completed
        this.emit('allTasksCompleted', this.tasks);
      }
      
      return true;
    }
    
    // Emit an error event if the task index is invalid
    this.emit('error', new Error(`Invalid task index: ${taskIndex}`));
    return false;
  }
  
  /**
   * List all tasks
   */
  listTasks() {
    return [...this.tasks]; // Return a copy of the tasks array
  }
}

// Create a new TaskManager instance
const taskManager = new TaskManager();

// Register event listeners

// Listen for task added events
taskManager.on('taskAdded', (task, totalTasks) => {
  console.log(`New task added: "${task.name}"`);
  console.log(`You now have ${totalTasks} task(s) in your list`);
});

// Listen for task completed events
taskManager.on('taskCompleted', (task) => {
  console.log(`Task completed: "${task.name}"`);
});

// Listen for all tasks completed event
taskManager.on('allTasksCompleted', (tasks) => {
  console.log(`🎉 All ${tasks.length} tasks have been completed! 🎉`);
});

// Listen for error events
taskManager.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

// Using our TaskManager
console.log('Adding tasks to our task manager:');

// Add some tasks
taskManager.addTask({ name: 'Learn Node.js basics', completed: false });
taskManager.addTask({ name: 'Understand the event loop', completed: false });
taskManager.addTask({ name: 'Master the EventEmitter class', completed: false });

console.log('\nCompleting tasks:');

// Complete tasks one by one
taskManager.completeTask(0);
taskManager.completeTask(1);
taskManager.completeTask(2);

// Try to complete an invalid task
taskManager.completeTask(99);

// ========================================================
// PART 3: ADVANCED EVENT EMITTER FEATURES
// ========================================================

console.log('\n📚 PART 3: Advanced EventEmitter Features');

/**
 * ONE-TIME LISTENERS
 * 
 * The 'once' method registers a listener that will be called
 * only the first time the event is emitted, then it's removed
 */

const onceEmitter = new EventEmitter();

console.log('Demonstrating once() method:');

// Register a one-time listener
onceEmitter.once('oneTimeEvent', () => {
  console.log('This listener will only be called once');
});

// Emit the event twice
console.log('First emit:');
onceEmitter.emit('oneTimeEvent');

console.log('Second emit:');
onceEmitter.emit('oneTimeEvent'); // Nothing happens this time

/**
 * REMOVING LISTENERS
 */

console.log('\nDemonstrating listener removal:');

// First, let's define a named function so we can reference it later
function greetingListener(name) {
  console.log(`Greetings, ${name}!`);
}

// Create a new emitter
const removableEmitter = new EventEmitter();

// Add the listener
removableEmitter.on('greet', greetingListener);

// Emit once
console.log('Before removal:');
removableEmitter.emit('greet', 'Alice');

// Remove the listener
removableEmitter.removeListener('greet', greetingListener);

// Emit again
console.log('After removal:');
removableEmitter.emit('greet', 'Alice'); // Nothing happens

/**
 * ERROR EVENTS
 * 
 * By convention, if an EventEmitter emits an 'error' event and there are no
 * listeners, Node.js will throw the error and potentially crash your program
 */

console.log('\nDemonstrating error handling:');

// Create an emitter for error demonstration
const errorEmitter = new EventEmitter();

// Add error listener to prevent crashes
errorEmitter.on('error', (err) => {
  console.log(`Error caught by listener: ${err.message}`);
});

// Emit an error event - this is safely handled
errorEmitter.emit('error', new Error('This is a test error'));

// ========================================================
// CONCLUSION
// ========================================================

console.log('\n📝 What we learned about events:');
console.log('1. Events help create loosely coupled, highly cohesive code');
console.log('2. You can extend EventEmitter to add event functionality to your classes');
console.log('3. Using events allows for flexible communication between components');
console.log('4. Node.js core modules use the EventEmitter pattern extensively');
console.log('5. Always handle "error" events to prevent program crashes');

/**
 * Events are a fundamental concept in Node.js and many built-in modules
 * like HTTP servers, streams, and more are built on top of the EventEmitter.
 * Understanding events is key to mastering Node.js!
 */ 