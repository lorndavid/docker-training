const express = require('express');
const pool = require('./db/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// 1. READ: Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. CREATE: Add a new student
app.post('/api/students', async (req, res) => {
  try {
    const { name, major } = req.body;
    const newStudent = await pool.query(
      'INSERT INTO students (name, major) VALUES ($1, $2) RETURNING *;',
      [name, major]
    );
    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. UPDATE: Edit an existing student's major
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { major } = req.body;
    const updateStudent = await pool.query(
      'UPDATE students SET major = $1 WHERE id = $2 RETURNING *;',
      [major, id]
    );
    res.json(updateStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 4. DELETE: Remove a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM students WHERE id = $1;', [id]);
    res.json({ message: 'Student was deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});