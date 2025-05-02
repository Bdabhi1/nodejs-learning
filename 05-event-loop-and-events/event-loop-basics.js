/**
 * EVENT LOOP BASICS
 * 
 * This file demonstrates the basics of the Node.js event loop and how it handles
 * synchronous and asynchronous code. We'll see the order in which different types
 * of operations are executed.
 */

// ========================================================
// PART 1: UNDERSTANDING CODE EXECUTION ORDER
// ========================================================

console.log('🚀 Starting the program');  // This runs first - regular synchronous code

/**
 * setTimeout schedules a callback to run after a specified delay
 * BUT Node.js will continue executing other code while waiting
 */
setTimeout(() => {
  // This code is placed in the Timer queue and will run after the delay
  // AND after the main script has finished
  console.log('🕒 This is from setTimeout (timer phase)');
}, 0); // Even with 0ms delay, this still gets scheduled for the next event loop iteration

/**
 * setImmediate schedules a callback to run in the "Check" phase
 * which comes after the "Poll" phase
 */
setImmediate(() => {
  console.log('⚡ This is from setImmediate (check phase)');
});

/**
 * process.nextTick is special - it runs after the current operation completes
 * but before the event loop continues. It's not technically part of the event loop,
 * but a special mechanism that runs before the next phase
 */
process.nextTick(() => {
  console.log('🔄 This is from process.nextTick (runs before the event loop proceeds)');
});

/**
 * Promises that resolve are handled in the microtask queue, which
 * is processed after the current operation and nextTick queue, but before
 * returning to the event loop
 */
Promise.resolve().then(() => {
  console.log('🤝 This is from a resolved Promise (microtask)');
});

// Regular synchronous code executes immediately
console.log('📝 This is regular synchronous code');

/**
 * Expected output order:
 * 1. 🚀 Starting the program
 * 2. 📝 This is regular synchronous code
 * 3. 🔄 This is from process.nextTick
 * 4. 🤝 This is from a resolved Promise
 * 5. 🕒 This is from setTimeout (usually, but order with setImmediate can vary)
 * 6. ⚡ This is from setImmediate (usually, but order with setTimeout can vary)
 * 
 * Note: The exact order between setTimeout(0) and setImmediate can vary depending
 * on the performance of your system and the state of the event loop.
 */

// ========================================================
// PART 2: VISUALIZING THE EVENT LOOP - MULTIPLE CALLBACKS
// ========================================================

// Simulating I/O operations with different timings
setTimeout(() => {
  console.log('\n➡️ Timer 1 executed (100ms)');
  
  // We can schedule more async operations inside callbacks
  process.nextTick(() => {
    console.log('  ↪️ nextTick inside Timer 1');
  });
}, 100);

setTimeout(() => {
  console.log('➡️ Timer 2 executed (0ms)');
}, 0);

setTimeout(() => {
  console.log('➡️ Timer 3 executed (0ms)');
}, 0);

// I/O example (file system operation)
const fs = require('fs');

// This operation gets scheduled in the Poll phase of the event loop
fs.readFile(__filename, () => {
  console.log('➡️ File read completed');
  
  // setTimeout inside an I/O callback - goes back to the timer phase
  setTimeout(() => {
    console.log('  ↪️ Timer inside File read callback');
  }, 0);
  
  // setImmediate inside an I/O callback - this is a special case
  // setImmediate is designed to execute immediately after the current Poll phase
  setImmediate(() => {
    console.log('  ↪️ Immediate inside File read callback');
  });
  
  // When setImmediate and setTimeout(0) are inside an I/O callback,
  // setImmediate will always come first!
});



// ========================================================
// PART 3: A PRACTICAL EXAMPLE - SIMULATING SERVER REQUESTS
// ========================================================

console.log('\n📊 Simulating multiple concurrent server requests:');

// Helper function to simulate an HTTP request with random completion time
function simulateRequest(requestId) {
  const randomTime = Math.floor(Math.random() * 100) + 10;
  
  console.log(`  🔹 Request ${requestId}: Starting, will take ${randomTime}ms`);
  
  // This simulates a non-blocking operation
  setTimeout(() => {
    console.log(`  ✅ Request ${requestId}: Completed after ${randomTime}ms`);
    
    // Simulate processing the response with a CPU-intensive task
    if (requestId === 3) {
      console.log(`  ⚠️ Request ${requestId}: Running CPU-intensive task...`);
      
      // This is BLOCKING code - it will prevent the event loop from proceeding
      // until it completes
      const startTime = Date.now();
      while (Date.now() - startTime < 100) {
        // Busy waiting for 100ms - BAD PRACTICE in real code!
        // This is just for demonstration
      }
      
      console.log(`  ⚠️ Request ${requestId}: CPU-intensive task completed`);
    }
  }, randomTime);
}

// Simulate 5 concurrent requests
for (let i = 1; i <= 5; i++) {
  simulateRequest(i);
}

console.log('📝 Main script execution completed. Event loop continues...\n');

/**
 * EVENT LOOP LESSONS:
 * 
 * 1. Synchronous code runs immediately
 * 2. Asynchronous operations are scheduled for later execution
 * 3. The event loop processes these operations in phases
 * 4. Blocking the event loop (like our CPU-intensive task) prevents other
 *    callbacks from executing until it completes
 * 5. Proper Node.js applications avoid blocking the event loop
 */ 