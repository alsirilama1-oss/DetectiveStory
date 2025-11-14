const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const usersPath = path.join(dataDir, 'students.json');

app.use(express.json());
app.use(express.static(__dirname));

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const loadUsers = () => {
  try {
    const raw = fs.readFileSync(usersPath, 'utf8');
    if (!raw || !raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

const persistUsers = (list) => {
  ensureDataDir();
  fs.writeFileSync(usersPath, JSON.stringify(list, null, 2));
};

const generateId = () => {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString('hex');
};

const stripSensitive = (user) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

const normalizeUserPayload = (body = {}) => {
  const firstName = (body.firstName || body.name || '').trim();
  const lastName = (body.lastName || body.lastname || '').trim();
  const className = (body.class || body.className || '').trim();
  const username = (body.username || body.name || body.firstName || '').trim().toLowerCase();
  const password = (body.password || '').trim();
  return { firstName, lastName, className, username, password };
};

let users = loadUsers();

const findUser = (username) => users.find((u) => u.username === username);

app.get('/users', (req, res) => {
  try {
    res.json(users.map(stripSensitive));
  } catch (err) {
    console.error('Failed to return users:', err);
    res.status(500).json({ error: 'list_failed' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, className, username, password } = normalizeUserPayload(req.body);
    if (!username || !password) {
      return res.status(400).json({ error: 'missing_fields' });
    }
    if (findUser(username)) {
      return res.status(409).json({ error: 'user_exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: generateId(),
      username,
      name: firstName || username,
      firstName: firstName || username,
      lastName,
      class: className,
      passwordHash,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    persistUsers(users);
    res.status(201).json(stripSensitive(user));
  } catch (err) {
    console.error('Failed to register user:', err);
    res.status(500).json({ error: 'register_failed' });
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const username = (req.body?.username || req.body?.name || req.body?.firstName || '').trim().toLowerCase();
    const password = (req.body?.password || '').trim();
    if (!username || !password) {
      return res.status(400).json({ error: 'missing_fields' });
    }
    const user = findUser(username);
    if (!user) {
      return res.status(404).json({ error: 'user_not_found' });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }
    res.json({ message: 'login_success', userId: user.id });
  } catch (err) {
    console.error('Failed to login user:', err);
    res.status(500).json({ error: 'login_failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

