/**
 * AVOIDING BLOCKING THE EVENT LOOP
 * 
 * This file demonstrates how to identify and avoid blocking operations
 * in your Node.js code, which is essential for maintaining performance
 * and responsiveness in your applications.
 */

console.log('⚠️ AVOIDING BLOCKING THE EVENT LOOP ⚠️\n');

// ========================================================
// PART 1: UNDERSTANDING BLOCKING OPERATIONS
// ========================================================

console.log('📚 PART 1: Understanding Blocking Operations');

/**
 * What is "blocking the event loop"?
 * 
 * When Node.js runs a CPU-intensive operation that takes a long time
 * to complete, it cannot process other events, callbacks, or requests
 * until the operation finishes. This is called "blocking the event loop."
 */

// Let's first look at a blocking operation
function blockingOperation(duration) {
  console.log(`Starting a blocking operation for ${duration}ms...`);
  
  // Get the current time
  const start = Date.now();
  
  // Run a loop until the specified duration has passed
  // This is a CPU-intensive operation that blocks the event loop
  while (Date.now() - start < duration) {
    // Do nothing, just waste CPU cycles
  }
  
  console.log(`Blocking operation completed after ${Date.now() - start}ms`);
}

// Let's demonstrate how this can affect our application

// Schedule some events with setTimeout
setTimeout(() => console.log('⏱️ This should execute after 100ms'), 100);
setTimeout(() => console.log('⏱️ This should execute after 200ms'), 200);

// But first, let's block the event loop
console.log('Running a blocking operation that will delay all other events:');
blockingOperation(500); // Block the event loop for 500ms

console.log('After blocking operation completed');
console.log('Notice how the timeouts execute late because of the blocking operation');

// ========================================================
// PART 2: NON-BLOCKING ALTERNATIVES
// ========================================================

console.log('\n📚 PART 2: Non-Blocking Alternatives');

/**
 * To avoid blocking the event loop, use:
 * 1. Asynchronous methods
 * 2. Split long operations into smaller chunks
 * 3. Use setImmediate/process.nextTick to yield to the event loop
 */

// Example 1: Using asynchronous methods
console.log('\nNon-blocking approach 1: Using asynchronous methods');

function nonBlockingOperation(duration, callback) {
  console.log(`Starting a non-blocking operation for ${duration}ms...`);
  
  // Use setTimeout, which doesn't block the event loop
  setTimeout(() => {
    console.log(`Non-blocking operation completed after ${duration}ms`);
    if (callback) callback();
  }, duration);
  
  console.log('Non-blocking operation initiated and returned immediately');
}

// Run our non-blocking operation
nonBlockingOperation(500, () => {
  console.log('This is the callback after non-blocking operation');
});

// These will execute before the non-blocking operation completes
console.log('This code runs immediately after starting the non-blocking operation');
setTimeout(() => console.log('⏱️ This 100ms timeout will not be delayed'), 100);

// Example 2: Processing arrays in chunks
console.log('\nNon-blocking approach 2: Processing large data in chunks');

/**
 * If you need to process a large array, you can split the work
 * into chunks and use setImmediate to avoid blocking the event loop
 */

// Create a large array to process
const largeArray = Array(10000000).fill(1);

// BAD approach: Process the entire array at once (blocking)
function processArrayBlocking(arr) {
  console.log(`Processing array with ${arr.length} items (blocking)...`);
  
  let sum = 0;
  const start = Date.now();
  
  // This will block the event loop while processing the entire array
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  
  console.log(`Finished processing in ${Date.now() - start}ms, sum: ${sum}`);
  return sum;
}

// GOOD approach: Process the array in chunks (non-blocking)
function processArrayInChunks(arr, chunkSize, callback) {
  console.log(`Processing array with ${arr.length} items in chunks of ${chunkSize}...`);
  
  let sum = 0;
  let index = 0;
  const start = Date.now();
  
  // Process one chunk at a time
  function processChunk() {
    // Calculate the end index for this chunk
    const end = Math.min(index + chunkSize, arr.length);
    
    // Process a chunk of the array
    for (let i = index; i < end; i++) {
      sum += arr[i];
    }
    
    // Update the index
    index = end;
    
    // If there are more items to process
    if (index < arr.length) {
      // Report progress occasionally
      if (index % (chunkSize * 10) === 0) {
        const percent = Math.round((index / arr.length) * 100);
        console.log(`  Progress: ${percent}% (processed ${index} of ${arr.length} items)`);
      }
      
      // Schedule the next chunk with setImmediate to avoid blocking
      setImmediate(processChunk);
    } else {
      // All chunks have been processed, call the callback
      console.log(`Finished processing in ${Date.now() - start}ms, sum: ${sum}`);
      if (callback) callback(sum);
    }
  }
  
  // Start processing the first chunk
  setImmediate(processChunk);
}

// Let's compare both approaches

// First, let's see the blocking version
console.log('\nRunning the blocking version:');
// Uncomment the next line to run the blocking version (it will freeze the program)
// processArrayBlocking(largeArray);
console.log('Skipped the blocking version to avoid freezing the program');

// Now, let's run the non-blocking version
console.log('\nRunning the non-blocking version:');
processArrayInChunks(largeArray, 1000000, (result) => {
  console.log(`Callback received the result: ${result}`);
});

// This will execute while the array is being processed
console.log('This code runs immediately after starting the non-blocking array processing');
setTimeout(() => console.log('⏱️ This timeout will execute during array processing'), 100);

// ========================================================
// PART 3: RECOGNIZING COMMON BLOCKING OPERATIONS
// ========================================================

console.log('\n📚 PART 3: Recognizing Common Blocking Operations');

/**
 * Common operations that can block the event loop:
 * 
 * 1. Complex calculations and algorithms
 * 2. Synchronous file operations (fs.readFileSync, etc.)
 * 3. Large JSON.parse/JSON.stringify operations
 * 4. Regular expressions on large strings
 * 5. Sorting large arrays
 */

console.log('\nExample of a commonly overlooked blocking operation: JSON.stringify');

// Create a complex object
const complexObject = {
  data: Array(100000).fill(0).map((_, i) => ({
    id: i,
    value: `Item ${i}`,
    nested: {
      moreData: `Nested data ${i}`,
      evenMore: {
        deeplyNested: `Deep data ${i}`
      }
    }
  }))
};

// BAD approach: Synchronous JSON stringify
function stringifyBlocking(obj) {
  console.log('Starting synchronous JSON.stringify...');
  const start = Date.now();
  
  try {
    const json = JSON.stringify(obj);
    console.log(`Stringified ${Math.round(json.length / 1024)} KB in ${Date.now() - start}ms`);
  } catch (err) {
    console.error('Stringify error:', err.message);
  }
}

// GOOD approach: Stringify in a separate thread using worker_threads
function stringifyNonBlocking(obj, callback) {
  console.log('In a real application, you would:');
  console.log('1. Use Worker Threads to move this to a separate thread');
  console.log('2. Break down the object into smaller parts if possible');
  console.log('3. Consider streaming solutions for very large objects');
  
  // For simplification, we'll just use setTimeout to demonstrate the concept
  console.log('Starting non-blocking JSON.stringify (simulated)...');
  
  setTimeout(() => {
    const start = Date.now();
    try {
      const json = JSON.stringify(obj);
      console.log(`Stringified ${Math.round(json.length / 1024)} KB in ${Date.now() - start}ms`);
      if (callback) callback(json);
    } catch (err) {
      console.error('Stringify error:', err.message);
      if (callback) callback(null, err);
    }
  }, 0);
  
  console.log('Scheduled JSON.stringify for later, continuing execution...');
}

// Let's compare both approaches
console.log('\nRunning the blocking version:');
// Uncomment the next line to run the blocking version (it may freeze the UI)
// stringifyBlocking(complexObject);
console.log('Skipped the blocking version to avoid freezing the program');

console.log('\nRunning the non-blocking version:');
stringifyNonBlocking(complexObject, (result, error) => {
  if (error) {
    console.error('Error in non-blocking stringify:', error);
  } else {
    console.log('Non-blocking stringify completed successfully');
  }
});

// This will execute while the stringification is pending
console.log('This code runs immediately after starting the non-blocking stringify');

// ========================================================
// PART 4: MONITORING YOUR EVENT LOOP
// ========================================================

console.log('\n📚 PART 4: Monitoring Your Event Loop');

/**
 * It's important to monitor your event loop to detect when it's blocked
 * and identify bottlenecks in your application.
 */

// A simple event loop lag monitor
function monitorEventLoopLag() {
  let lastCheck = Date.now();
  
  // Check the lag every 100ms
  const expectedInterval = 100;
  
  const interval = setInterval(() => {
    const now = Date.now();
    const drift = now - lastCheck - expectedInterval;
    
    if (drift > 50) { // If we're more than 50ms late, the event loop was likely blocked
      console.log(`⚠️ Event Loop Lag Detected: ${drift}ms`);
    }
    
    lastCheck = now;
  }, expectedInterval);
  
  // Stop monitoring after 10 seconds
  setTimeout(() => {
    clearInterval(interval);
    console.log('Event loop monitoring stopped');
  }, 10000);
  
  console.log('Started monitoring event loop lag');
}

// Start monitoring
monitorEventLoopLag();

// Let's cause some intermittent blocking to demonstrate the monitor
setTimeout(() => {
  console.log('\nCausing an intentional 200ms block:');
  blockingOperation(200);
}, 1000);

setTimeout(() => {
  console.log('\nCausing another intentional 300ms block:');
  blockingOperation(300);
}, 3000);

// ========================================================
// CONCLUSION
// ========================================================

setTimeout(() => {
  console.log('\n📝 KEY TAKEAWAYS ON AVOIDING BLOCKING THE EVENT LOOP:');
  console.log('1. The event loop is the heart of Node.js concurrency');
  console.log('2. Long-running synchronous operations block the event loop');
  console.log('3. Use asynchronous alternatives where possible');
  console.log('4. Break down large operations into smaller chunks');
  console.log('5. Consider worker threads for CPU-intensive tasks');
  console.log('6. Monitor your event loop for detecting bottlenecks');
  console.log("7. Remember: Node.js excels at I/O, not CPU-intensive tasks");
}, 5000);

/**
 * REMEMBER:
 * 
 * A blocked event loop can't:
 * - Handle new incoming requests
 * - Process existing callbacks
 * - Perform I/O operations
 * 
 * This causes your application to become unresponsive!
 */ 