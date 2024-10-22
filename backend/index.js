require('dotenv').config({ path: '.env.local' });
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());


// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Example route to query the PostgreSQL database
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('API is working');
});

// Example API route for sending data to the frontend
app.get('/api/data', (req, res) => {
  // Replace with actual database query logic
  const sampleData = { name: 'Golf World', score: 72 };
  res.json(sampleData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
