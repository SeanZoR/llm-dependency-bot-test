import { processData, fetchUserData } from '../index.js';
import assert from 'assert';

/**
 * Simple test suite for dependency bot testing
 */

console.log('Running tests...\n');

// Test 1: Lodash functionality
console.log('Test 1: Testing lodash data processing...');
const testData = [1, 2, 3, 4, 5, 6];
const result = processData(testData);
assert.deepStrictEqual(result, [[1, 2], [3, 4], [5, 6]], 'Data chunking failed');
console.log('✅ Lodash test passed\n');

// Test 2: Axios functionality
console.log('Test 2: Testing axios HTTP client...');
try {
  const userData = await fetchUserData(1);
  assert(userData.id === 1, 'User ID mismatch');
  assert(userData.name, 'User name missing');
  console.log('✅ Axios test passed\n');
} catch (error) {
  console.error('❌ Axios test failed:', error.message);
  process.exit(1);
}

// Test 3: Verify all dependencies are loaded
console.log('Test 3: Verifying dependencies are available...');
try {
  await import('axios');
  await import('lodash');
  await import('express');
  console.log('✅ All dependencies loaded successfully\n');
} catch (error) {
  console.error('❌ Dependency loading failed:', error.message);
  process.exit(1);
}

console.log('🎉 All tests passed!');
