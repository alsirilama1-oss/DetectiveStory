const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/im-esport-hub'

app.use(express.json())
app.use(express.static(__dirname))

// --- Mongo setup -----------------------------------------------------------
mongoose.set('strictQuery', true)

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    username: { type: String, trim: true, lowercase: true },
    passwordHash: { type: String },
    // demo stats used by konto page
    rank: { type: String, default: '#12' },
    wins: { type: Number, default: 4 },
    played: { type: Number, default: 18 },
    hours: { type: Number, default: 42 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

studentSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
    return ret
  },
})

const Student = mongoose.model('Student', studentSchema)

function sanitize(body = {}) {
  return {
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    className: body.className?.trim() || body.class?.trim(),
    username: body.username?.trim().toLowerCase(),
    password: body.password,
  }
}

// --- Routes ----------------------------------------------------------------
app.post('/api/students', async (req, res) => {
  const { firstName, lastName, className, username, password } = sanitize(req.body)
  if (!firstName || !lastName || !className) {
    return res.status(400).json({ error: 'First name, last name and class are required' })
  }

  try {
    let passwordHash
    if (username && password) {
      const existing = await Student.findOne({ username }).exec()
      if (existing) return res.status(409).json({ error: 'Username already exists' })
      passwordHash = await bcrypt.hash(password, 10)
    }

    const created = await Student.create({
      firstName,
      lastName,
      className,
      username,
      passwordHash,
    })
    res.status(201).json(created)
  } catch (err) {
    console.error('Failed to create student', err)
    res.status(500).json({ error: 'Could not create student' })
  }
})

app.post('/api/students/login', async (req, res) => {
  const { username, password } = sanitize(req.body)
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const student = await Student.findOne({ username }).exec()
    if (!student || !student.passwordHash) {
      return res.status(404).json({ error: 'User not found' })
    }
    const ok = await bcrypt.compare(password, student.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    res.json(student)
  } catch (err) {
    console.error('Login failed', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

app.get('/api/students', async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: 1 }).exec()
    res.json(students)
  } catch (err) {
    console.error('Failed to fetch students', err)
    res.status(500).json({ error: 'Could not fetch students' })
  }
})

app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }
  try {
    const student = await Student.findById(id).exec()
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json(student)
  } catch (err) {
    console.error('Failed to fetch student', err)
    res.status(500).json({ error: 'Could not fetch student' })
  }
})

app.get('/api/students/latest', async (_req, res) => {
  try {
    const latest = await Student.findOne().sort({ createdAt: -1 }).exec()
    if (!latest) return res.status(404).json({ error: 'No registered students yet' })
    res.json(latest)
  } catch (err) {
    console.error('Failed to fetch latest student', err)
    res.status(500).json({ error: 'Could not fetch students' })
  }
})

// --- Start -----------------------------------------------------------------
async function start() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log(`Connected to MongoDB at ${MONGODB_URI}`)
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
