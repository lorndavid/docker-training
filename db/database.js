const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost', 
  database: process.env.DB_NAME || 'docker_course',
  password: process.env.DB_PASSWORD || '123456', 
  port: process.env.DB_PORT || 5432,
});

// Test the connection immediately on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to Postgres database successfully!');
  }
});

module.exports = pool;