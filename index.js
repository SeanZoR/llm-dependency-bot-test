import axios from 'axios';
import _ from 'lodash';
import express from 'express';

/**
 * Simple application to test dependency bot
 * Uses axios, lodash, and express
 */

const app = express();
const PORT = 3000;

// Lodash utility example
export function processData(data) {
  return _.chunk(data, 2);
}

// Axios HTTP client example
export async function fetchUserData(userId) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    throw error;
  }
}

// Express server
app.get('/', (req, res) => {
  res.json({ message: 'LLM Dependency Bot Test App', status: 'running' });
});

app.get('/api/data', (req, res) => {
  const data = [1, 2, 3, 4, 5, 6];
  const processed = processData(data);
  res.json({ original: data, processed });
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const userData = await fetchUserData(req.params.id);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Only start server if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Test app running on http://localhost:${PORT}`);
  });
}

export default app;
