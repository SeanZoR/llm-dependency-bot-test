import {
  processData,
  fetchUserData,
  generateId,
  formatFutureDate,
  validateUser
} from '../index.js';
import assert from 'assert';

/**
 * Comprehensive test suite for dependency bot testing
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

// Test 3: UUID generation
console.log('Test 3: Testing UUID generation...');
const id1 = generateId();
const id2 = generateId();
assert(typeof id1 === 'string', 'UUID should be a string');
assert(id1.length === 36, 'UUID should be 36 characters long');
assert(id1 !== id2, 'UUIDs should be unique');
console.log('✅ UUID test passed\n');

// Test 4: Date formatting
console.log('Test 4: Testing date-fns date formatting...');
const futureDate = formatFutureDate(7);
assert(typeof futureDate === 'string', 'Date should be a string');
assert(/^\d{4}-\d{2}-\d{2}$/.test(futureDate), 'Date should be in YYYY-MM-DD format');
console.log('✅ Date-fns test passed\n');

// Test 5: Joi validation
console.log('Test 5: Testing Joi validation...');
const validUser = { name: 'John Doe', email: 'john@example.com', age: 30 };
const invalidUser = { name: 'Jo', email: 'invalid-email' };

const validResult = validateUser(validUser);
assert(!validResult.error, 'Valid user should pass validation');

const invalidResult = validateUser(invalidUser);
assert(invalidResult.error, 'Invalid user should fail validation');
console.log('✅ Joi validation test passed\n');

// Test 6: Verify all dependencies are loaded
console.log('Test 6: Verifying all dependencies load...');
try {
  await import('axios');
  await import('lodash');
  await import('express');
  await import('dotenv');
  await import('joi');
  await import('uuid');
  await import('date-fns');
  await import('chalk');
  console.log('✅ All dependencies loaded successfully\n');
} catch (error) {
  console.error('❌ Dependency loading failed:', error.message);
  process.exit(1);
}

console.log('🎉 All tests passed!');
