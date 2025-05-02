// os-example.js - OS Module Examples

/**
 * The 'os' module provides operating system-related utility methods and properties.
 * 
 * It allows you to:
 * - Get information about the computer's operating system
 * - Retrieve system memory information
 * - Get details about the CPU
 * - Access network interfaces
 * - And more!
 * 
 * This can be useful for:
 * - System monitoring applications
 * - Cross-platform applications that need to adapt to different OS environments
 * - Performance optimization based on system resources
 */

// Import the os module
const os = require('os');

console.log('------ OS MODULE DEMO ------');

// SECTION 1: BASIC SYSTEM INFORMATION

/**
 * os.platform() returns a string identifying the operating system platform
 * Possible values: 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'
 */
console.log('\n1. Operating System Platform:');
console.log(`   Platform: ${os.platform()}`);

/**
 * os.type() returns the operating system name as returned by uname or similar commands
 * Examples: 'Linux', 'Darwin' (macOS), 'Windows_NT'
 */
console.log('\n2. Operating System Type:');
console.log(`   Type: ${os.type()}`);

/**
 * os.release() returns the operating system release version
 */
console.log('\n3. Operating System Release:');
console.log(`   Release: ${os.release()}`);

/**
 * os.arch() returns the operating system CPU architecture
 * Possible values: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', 'x64'
 */
console.log('\n4. CPU Architecture:');
console.log(`   Architecture: ${os.arch()}`);

// SECTION 2: MEMORY INFORMATION

/**
 * os.totalmem() returns the total amount of system memory in bytes
 * os.freemem() returns the amount of free system memory in bytes
 * 
 * Note: We convert from bytes to more human-readable formats (GB in this case)
 */
console.log('\n5. Memory Information:');
// Convert bytes to gigabytes and round to 2 decimal places
const totalMemoryGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMemoryGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
const usedMemoryGB = (totalMemoryGB - freeMemoryGB).toFixed(2);
const memoryUsagePercentage = ((usedMemoryGB / totalMemoryGB) * 100).toFixed(2);

console.log(`   Total Memory: ${totalMemoryGB} GB`);
console.log(`   Free Memory: ${freeMemoryGB} GB`);
console.log(`   Used Memory: ${usedMemoryGB} GB`);
console.log(`   Memory Usage: ${memoryUsagePercentage}%`);

// SECTION 3: CPU INFORMATION

/**
 * os.cpus() returns an array of objects containing information about each logical CPU core
 */
console.log('\n6. CPU Information:');
const cpus = os.cpus();
console.log(`   Number of CPU Cores: ${cpus.length}`);

// Display information about the first CPU core
console.log('   CPU Core 0 Information:');
console.log(`   - Model: ${cpus[0].model}`);
console.log(`   - Speed: ${cpus[0].speed} MHz`);

// Calculate average CPU load
console.log('\n   CPU Usage (based on process times):');
cpus.forEach((cpu, index) => {
  const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
  const idle = cpu.times.idle;
  const usage = ((total - idle) / total * 100).toFixed(2);
  console.log(`   - Core ${index}: ${usage}% used`);
});

// SECTION 4: SYSTEM UPTIME AND USER INFO

/**
 * os.uptime() returns the system uptime in seconds
 */
console.log('\n7. System Uptime:');
const uptime = os.uptime();
const uptimeDays = Math.floor(uptime / 86400);
const uptimeHours = Math.floor((uptime % 86400) / 3600);
const uptimeMinutes = Math.floor((uptime % 3600) / 60);
const uptimeSeconds = Math.floor(uptime % 60);

console.log(`   Uptime: ${uptimeDays} days, ${uptimeHours} hours, ${uptimeMinutes} minutes, ${uptimeSeconds} seconds`);

/**
 * os.userInfo() returns information about the current user
 */
console.log('\n8. User Information:');
try {
  const userInfo = os.userInfo();
  console.log(`   Username: ${userInfo.username}`);
  console.log(`   User ID: ${userInfo.uid}`);
  console.log(`   Group ID: ${userInfo.gid}`);
  console.log(`   Home Directory: ${userInfo.homedir}`);
  console.log(`   Shell: ${userInfo.shell}`);
} catch (error) {
  console.error(`   Error retrieving user info: ${error.message}`);
}

// SECTION 5: NETWORK INTERFACES

/**
 * os.networkInterfaces() returns an object containing network interfaces
 */
console.log('\n9. Network Interfaces:');
const networkInterfaces = os.networkInterfaces();

// Iterate through each network interface
Object.keys(networkInterfaces).forEach(interfaceName => {
  console.log(`   Interface: ${interfaceName}`);
  
  // Each interface may have multiple address configurations
  networkInterfaces[interfaceName].forEach(interface => {
    console.log(`   - Address: ${interface.address}`);
    console.log(`     Family: ${interface.family}`);
    console.log(`     Netmask: ${interface.netmask}`);
    if (interface.mac) {
      console.log(`     MAC: ${interface.mac}`);
    }
    console.log(`     Internal: ${interface.internal ? 'Yes' : 'No'}`);
    console.log();
  });
});

// SECTION 6: SYSTEM CONSTANTS

/**
 * os.constants provides commonly used operating system-specific constants
 */
console.log('\n10. OS Constants:');
console.log('   Signal Constants (for process termination):');
console.log(`   - SIGINT (Interrupt): ${os.constants.signals.SIGINT}`);
console.log(`   - SIGTERM (Termination): ${os.constants.signals.SIGTERM}`);

console.log('\n   Error Constants:');
console.log(`   - EADDRINUSE (Address already in use): ${os.constants.errno.EADDRINUSE}`);
console.log(`   - ECONNREFUSED (Connection refused): ${os.constants.errno.ECONNREFUSED}`);

// SECTION 7: OTHER USEFUL INFORMATION

/**
 * os.hostname() returns the hostname of the operating system
 */
console.log('\n11. System Hostname:');
console.log(`   Hostname: ${os.hostname()}`);

/**
 * os.homedir() returns the home directory of the current user
 */
console.log('\n12. Current User\'s Home Directory:');
console.log(`   Home Directory: ${os.homedir()}`);

/**
 * os.tmpdir() returns the operating system's default temporary directory
 */
console.log('\n13. Temporary Directory:');
console.log(`   Temp Directory: ${os.tmpdir()}`);

/**
 * os.endianness() returns the endianness of the CPU ('BE' for big endian or 'LE' for little endian)
 */
console.log('\n14. CPU Endianness:');
console.log(`   Endianness: ${os.endianness()} (${os.endianness() === 'BE' ? 'Big Endian' : 'Little Endian'})`);

/**
 * OS Line Ending
 * 
 * The os.EOL property gives you the operating system-specific line ending:
 * - Windows: \r\n (CRLF)
 * - UNIX/Linux/macOS: \n (LF)
 */
console.log('\n15. OS-specific Line Ending:');
console.log(`   EOL Character Code: ${JSON.stringify(os.EOL)}`);
if (os.EOL === '\r\n') {
  console.log('   Line Ending: CRLF (Windows-style)');
} else if (os.EOL === '\n') {
  console.log('   Line Ending: LF (UNIX/Linux/macOS-style)');
}

console.log('\nOS module demo complete!');

/**
 * To run this file, use:
 * node os-example.js
 */ 