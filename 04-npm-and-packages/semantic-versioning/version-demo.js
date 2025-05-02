/**
 * This script demonstrates semantic versioning rules
 * and how different version constraints work.
 * 
 * It simulates package versioning without requiring actual npm packages.
 */

// Function to check if a version satisfies a version range
function satisfies(version, range) {
  console.log(`Checking if version ${version} satisfies range "${range}"`);
  
  // This is a simplified implementation for demonstration
  // For real applications, use the semver package
  
  // Handle exact versions
  if (!range.match(/[\^~<>=*]/)) {
    return version === range ? 'YES ✅' : 'NO ❌';
  }
  
  // Handle caret ranges (^)
  if (range.startsWith('^')) {
    const baseVersion = range.substring(1);
    const [major, minor, patch] = baseVersion.split('.').map(Number);
    
    const [vMajor, vMinor, vPatch] = version.split('.').map(Number);
    
    if (major === 0) {
      if (minor === 0) {
        // ^0.0.x -> only allow patch updates
        return (vMajor === 0 && vMinor === 0 && vPatch >= patch) ? 'YES ✅' : 'NO ❌';
      }
      // ^0.y.x -> allow minor and patch updates within the same minor
      return (vMajor === 0 && vMinor === minor && vPatch >= patch) ? 'YES ✅' : 'NO ❌';
    }
    
    // ^x.y.z -> allow everything that doesn't increase the major version
    return (vMajor === major && (vMinor > minor || (vMinor === minor && vPatch >= patch))) ? 'YES ✅' : 'NO ❌';
  }
  
  // Handle tilde ranges (~)
  if (range.startsWith('~')) {
    const baseVersion = range.substring(1);
    const [major, minor, patch] = baseVersion.split('.').map(Number);
    const [vMajor, vMinor, vPatch] = version.split('.').map(Number);
    
    // ~x.y.z -> allow patch updates
    return (vMajor === major && vMinor === minor && vPatch >= patch) ? 'YES ✅' : 'NO ❌';
  }
  
  // Handle star range (*)
  if (range === '*') {
    return 'YES ✅';
  }
  
  // Handle x ranges (1.x.x, 1.2.x)
  if (range.includes('x')) {
    const parts = range.split('.');
    const vParts = version.split('.');
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'x') continue;
      if (parts[i] !== vParts[i]) return 'NO ❌';
    }
    
    return 'YES ✅';
  }
  
  // This is a simplified implementation that doesn't handle all cases
  // Real-world code should use the semver package
  return 'UNKNOWN (complex range)';
}

// Demonstrate the caret range (^)
console.log('\n=== CARET RANGE (^) ===');
console.log('Allows changes that do not modify the leftmost non-zero digit');

console.log('\n^1.2.3 means >=1.2.3 <2.0.0:');
console.log(`1.2.3: ${satisfies('1.2.3', '^1.2.3')}`);
console.log(`1.2.4: ${satisfies('1.2.4', '^1.2.3')}`);
console.log(`1.3.0: ${satisfies('1.3.0', '^1.2.3')}`);
console.log(`2.0.0: ${satisfies('2.0.0', '^1.2.3')}`);

console.log('\n^0.2.3 means >=0.2.3 <0.3.0:');
console.log(`0.2.3: ${satisfies('0.2.3', '^0.2.3')}`);
console.log(`0.2.4: ${satisfies('0.2.4', '^0.2.3')}`);
console.log(`0.3.0: ${satisfies('0.3.0', '^0.2.3')}`);

console.log('\n^0.0.3 means >=0.0.3 <0.0.4:');
console.log(`0.0.3: ${satisfies('0.0.3', '^0.0.3')}`);
console.log(`0.0.4: ${satisfies('0.0.4', '^0.0.3')}`);

// Demonstrate the tilde range (~)
console.log('\n=== TILDE RANGE (~) ===');
console.log('Allows patch-level changes if minor is specified');

console.log('\n~1.2.3 means >=1.2.3 <1.3.0:');
console.log(`1.2.3: ${satisfies('1.2.3', '~1.2.3')}`);
console.log(`1.2.4: ${satisfies('1.2.4', '~1.2.3')}`);
console.log(`1.3.0: ${satisfies('1.3.0', '~1.2.3')}`);

// Demonstrate exact version matches
console.log('\n=== EXACT VERSION ===');
console.log('Only allows the exact version specified');

console.log('\n1.2.3 means exactly 1.2.3:');
console.log(`1.2.3: ${satisfies('1.2.3', '1.2.3')}`);
console.log(`1.2.4: ${satisfies('1.2.4', '1.2.3')}`);

// Demonstrate x-ranges
console.log('\n=== X-RANGE ===');
console.log('Allows any version where specified parts match');

console.log('\n1.x.x means any version starting with 1:');
console.log(`1.0.0: ${satisfies('1.0.0', '1.x.x')}`);
console.log(`1.9.9: ${satisfies('1.9.9', '1.x.x')}`);
console.log(`2.0.0: ${satisfies('2.0.0', '1.x.x')}`);

// Demonstration of versioning with breaking changes
console.log('\n=== VERSIONING EVOLUTION EXAMPLE ===');
console.log(`
Package Evolution:
1.0.0: Initial release with function calculateArea(width, height)
1.0.1: Fixed a bug in error handling (PATCH)
1.1.0: Added new function calculatePerimeter(width, height) (MINOR)
1.1.1: Fixed a memory leak (PATCH)
2.0.0: Changed parameter order to calculateArea(height, width) (MAJOR - breaking change)
2.1.0: Added optional parameters for units (MINOR)
`);

console.log('Dependency constraints and what you would get:');
console.log(`"^1.0.0" would get you up to 1.1.1 but not 2.0.0`);
console.log(`"~1.0.0" would get you up to 1.0.1 but not 1.1.0`);
console.log(`">=1.0.0 <2.0.0" would get you up to 1.1.1 but not 2.0.0`);
console.log(`">1.0.0" would get you anything after 1.0.0, including breaking changes`);

console.log('\n=== BEST PRACTICES ===');
console.log(`
1. For libraries: Use ^ for dependencies to get bug fixes and features
2. For applications: Consider using more restrictive ranges or exact versions
3. Always use package-lock.json to lock exact versions in production
4. For critical dependencies: Use ~ to only get bug fixes
5. Test your app when updating dependencies
`);

console.log('\nTo learn more, visit https://semver.npmjs.com/ to visualize semver ranges'); 