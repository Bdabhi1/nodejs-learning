/**
 * EVENT LOOP PHASES
 * 
 * This file provides a practical demonstration of the different phases
 * of the Node.js event loop, showing how they process different types
 * of tasks in a specific order.
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 NODE.JS EVENT LOOP PHASES 🔄\n');

/**
 * The Node.js event loop goes through the following phases in order:
 * 
 * 1. ⏱️ TIMERS: Execute callbacks scheduled by setTimeout() and setInterval()
 * 2. 🔄 PENDING CALLBACKS: Execute I/O callbacks deferred to the next loop
 * 3. ⏸️ IDLE, PREPARE: Used internally by Node.js
 * 4. 📥 POLL: Retrieve new I/O events and execute I/O callbacks
 * 5. ✅ CHECK: Execute setImmediate() callbacks
 * 6. 🔚 CLOSE CALLBACKS: Execute close event callbacks
 * 
 * Between each phase, the event loop checks for and runs microtasks:
 * - process.nextTick() callbacks
 * - Promise callbacks
 */

console.log('🚀 Starting the event loop phases demonstration');

// Create a temporary file for our demo
const tempFilePath = path.join(__dirname, 'temp-file.txt');
fs.writeFileSync(tempFilePath, 'This is a temporary file for the event loop demo');

// ========================================================
// DEMONSTRATING THE EVENT LOOP PHASES
// ========================================================

// Track the execution order
const executionOrder = [];

// 1. ⏱️ TIMERS PHASE
// setTimeout callbacks are executed in the timers phase
console.log('\n1. Setting up TIMER phase callbacks (setTimeout)');

setTimeout(() => {
  console.log('⏱️  Timer phase - setTimeout 100ms callback executing');
  executionOrder.push('Timer (100ms)');
}, 100);

setTimeout(() => {
  console.log('⏱️  Timer phase - setTimeout 0ms callback executing');
  executionOrder.push('Timer (0ms)');
  
  // Schedule a nextTick from inside a timer callback
  process.nextTick(() => {
    console.log('  🔄 nextTick inside setTimeout callback');
    executionOrder.push('nextTick inside Timer');
  });
}, 0);

// 2. and 4. 🔄 PENDING CALLBACKS and POLL PHASE
// I/O operations typically go through the poll phase
console.log('\n2. Setting up I/O callbacks (fs.readFile)');

fs.readFile(tempFilePath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  console.log('📥 Poll phase - File read callback executing');
  console.log(`  Read ${data.length} bytes from file`);
  executionOrder.push('I/O (fs.readFile)');
  
  // Schedule a nextTick from inside an I/O callback
  process.nextTick(() => {
    console.log('  🔄 nextTick inside I/O callback');
    executionOrder.push('nextTick inside I/O');
  });
  
  // Schedule a setImmediate from inside an I/O callback
  // This is a special case - when scheduled inside an I/O callback,
  // setImmediate will always run before any timers
  setImmediate(() => {
    console.log('  ✅ Check phase - setImmediate inside I/O callback');
    executionOrder.push('setImmediate inside I/O');
  });
  
  // Schedule a setTimeout(0) from inside an I/O callback
  setTimeout(() => {
    console.log('  ⏱️  Timer phase - setTimeout inside I/O callback');
    executionOrder.push('Timer inside I/O');
  }, 0);
});

// 5. ✅ CHECK PHASE
// setImmediate callbacks are executed in the check phase
console.log('\n3. Setting up CHECK phase callbacks (setImmediate)');

setImmediate(() => {
  console.log('✅ Check phase - setImmediate callback executing');
  executionOrder.push('setImmediate');
  
  // Schedule a nextTick from inside a setImmediate callback
  process.nextTick(() => {
    console.log('  🔄 nextTick inside setImmediate callback');
    executionOrder.push('nextTick inside setImmediate');
  });
});

// 6. 🔚 CLOSE CALLBACKS
// close events are executed in the close callbacks phase
console.log('\n4. Setting up CLOSE phase callbacks');

// Create a readable stream to demonstrate close events
const stream = fs.createReadStream(tempFilePath);
stream.on('data', (chunk) => {
  console.log(`  Stream received ${chunk.length} bytes of data`);
});

stream.on('close', () => {
  console.log('🔚 Close phase - Stream close event executing');
  executionOrder.push('Close event');
  
  // Delete our temporary file
  fs.unlinkSync(tempFilePath);
  console.log('  Temporary file deleted');
});

// Read the stream and then destroy it to trigger the close event
stream.on('readable', () => {
  const data = stream.read();
  if (data) {
    // Just read the data to advance the stream
  }
  // Destroy the stream to trigger the close event
  stream.destroy();
});

// MICROTASKS
// process.nextTick and Promises are handled as microtasks
// and run between event loop phases
console.log('\n5. Setting up MICROTASKS (nextTick and Promises)');

process.nextTick(() => {
  console.log('🔄 nextTick callback executing (before any phase)');
  executionOrder.push('nextTick');
});

Promise.resolve().then(() => {
  console.log('🤝 Promise.then callback executing (microtask after nextTick)');
  executionOrder.push('Promise');
});

// ========================================================
// COMPARING setTimeout(0) vs setImmediate
// ========================================================

console.log('\n6. Comparing setTimeout(0) and setImmediate directly');

/**
 * When setTimeout(0) and setImmediate are scheduled outside of an I/O cycle,
 * the order of execution can vary based on the performance of the event loop.
 * 
 * Let's run them multiple times to see the variations.
 */

// Test the ordering multiple times to show the variability
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(`🔍 Test ${i+1}: setTimeout(0) executing`);
  }, 0);
  
  setImmediate(() => {
    console.log(`🔍 Test ${i+1}: setImmediate executing`);
  });
}

// ========================================================
// TRACKING THE MAIN SCRIPT EXECUTION
// ========================================================

// Main script is run synchronously before the event loop starts processing events
console.log('\n📝 Main script execution completed');
executionOrder.push('Main script');

// ========================================================
// DISPLAY EXECUTION ORDER AFTER ALL EVENTS PROCESSED
// ========================================================

// We'll use setTimeout with a long enough delay to ensure all other callbacks have executed
setTimeout(() => {
  console.log('\n📊 FINAL EXECUTION ORDER:');
  executionOrder.forEach((step, index) => {
    console.log(`  ${index + 1}. ${step}`);
  });
  
  console.log('\n📝 KEY TAKEAWAYS ABOUT EVENT LOOP PHASES:');
  console.log('1. The event loop processes different types of events in a specific order (phases)');
  console.log('2. Microtasks (nextTick, Promises) run between phases and have priority');
  console.log('3. Main script runs completely before any async callbacks are processed');
  console.log('4. Within an I/O callback, setImmediate runs before setTimeout(0)');
  console.log('5. Outside an I/O callback, the order of setTimeout(0) and setImmediate can vary');
  console.log('6. Understanding these phases helps you control the flow of asynchronous code');
}, 1000);

/**
 * EVENT LOOP PHASES RECAP:
 * 
 * 1. ⏱️ TIMERS: setTimeout, setInterval callbacks
 * 2. 🔄 PENDING CALLBACKS: Deferred I/O callbacks
 * 3. ⏸️ IDLE, PREPARE: Internal use only
 * 4. 📥 POLL: I/O events and callbacks
 * 5. ✅ CHECK: setImmediate callbacks
 * 6. 🔚 CLOSE CALLBACKS: Close events
 * 
 * MICROTASKS run between phases:
 * - process.nextTick() (highest priority)
 * - Promise callbacks
 */ 