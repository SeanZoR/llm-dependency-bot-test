import axios from 'axios';
import _ from 'lodash';
import express from 'express';
import dotenv from 'dotenv';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { format, addDays } from 'date-fns';
import chalk from 'chalk';

// Load environment variables
dotenv.config();

/**
 * Simple application to test dependency bot
 * Uses multiple dependencies to test various update scenarios
 */

const app = express();
const PORT = process.env.PORT || 3000;

// Lodash utility example
export function processData(data) {
  return _.chunk(data, 2);
}

// UUID generation example
export function generateId() {
  return uuidv4();
}

// Date manipulation example
export function formatFutureDate(daysAhead) {
  const futureDate = addDays(new Date(), daysAhead);
  return format(futureDate, 'yyyy-MM-dd');
}

// Joi validation example
export function validateUser(userData) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0).max(120)
  });

  return schema.validate(userData);
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

app.get('/api/id', (req, res) => {
  res.json({ id: generateId(), timestamp: new Date().toISOString() });
});

app.get('/api/date/:days', (req, res) => {
  const daysAhead = parseInt(req.params.days, 10);
  res.json({ futureDate: formatFutureDate(daysAhead) });
});

app.post('/api/validate-user', express.json(), (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.json({ valid: true, user: value });
  }
});

// Only start server if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(chalk.green(`✓ Test app running on http://localhost:${PORT}`));
  });
}

export default app;
