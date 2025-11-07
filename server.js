const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const dataPath = path.join(__dirname, 'data', 'students.json');

function readStudents() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    if (!raw || !raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function writeStudents(list) {
  fs.writeFileSync(dataPath, JSON.stringify(list, null, 2));
}

app.get('/api/students', (req, res) => {
  try {
    const list = readStudents();
    res.json(list);
  } catch (err) {
    console.error('Failed to read students:', err);
    res.status(500).json({ error: 'read_failed' });
  }
});


app.post('/api/students', (req, res) => {
  try {
    const { firstName, lastName, class: className } = req.body || {};
    if (!firstName || !lastName || !className) {
      return res.status(400).json({ error: 'missing_fields' });
    }
    const list = readStudents();
    const student = { firstName, lastName, class: className };
    list.push(student);
    writeStudents(list);
    res.status(201).json(student);
  } catch (err) {
    console.error('Failed to write students:', err);
    res.status(500).json({ error: 'write_failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

