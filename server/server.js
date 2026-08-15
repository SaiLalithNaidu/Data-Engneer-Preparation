import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'data_store.json');

// Initialize database file if it doesn't exist
function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      users: [],
      progress: {},
      tokens: {}
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { users: [], progress: {}, tokens: {} };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Simple Helper to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'de_prep_salt_2026').digest('hex');
}

// Helper to authenticate request token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  const db = loadDatabase();
  const userId = db.tokens[token];

  if (!userId) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }

  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(403).json({ success: false, message: 'User not found' });
  }

  req.user = user;
  next();
}

// ---------------- API ENDPOINTS ---------------- //

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Sign Up User
app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, password, targetRole } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const db = loadDatabase();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists. Please Sign In.' });
  }

  const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  const newUser = {
    id: userId,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(password),
    targetRole: targetRole || 'Data Engineer',
    createdAt: new Date().toISOString()
  };

  const token = 'token_' + Date.now() + '_' + crypto.randomBytes(16).toString('hex');

  db.users.push(newUser);
  db.tokens[token] = userId;
  db.progress[userId] = []; // Initialize empty individual user progress

  saveDatabase(db);

  console.log(`[AUTH] New User Registered: ${newUser.email} (${newUser.fullName})`);

  res.json({
    success: true,
    token: token,
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      targetRole: newUser.targetRole
    }
  });
});

// 3. Sign In User
app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter both Email and Password.' });
  }

  const db = loadDatabase();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'No account found with this email. Please Sign Up.' });
  }

  if (user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
  }

  const token = 'token_' + Date.now() + '_' + crypto.randomBytes(16).toString('hex');
  db.tokens[token] = user.id;
  saveDatabase(db);

  console.log(`[AUTH] User Signed In: ${user.email}`);

  res.json({
    success: true,
    token: token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      targetRole: user.targetRole
    }
  });
});

// 4. Get Current Authenticated User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      targetRole: req.user.targetRole
    }
  });
});

// 5. Get Individual User's Mastered Progress
app.get('/api/user/progress', authenticateToken, (req, res) => {
  const db = loadDatabase();
  const userMasteredQIds = db.progress[req.user.id] || [];
  res.json({
    success: true,
    masteredQIds: userMasteredQIds
  });
});

// 6. Update Individual User's Mastered Progress
app.post('/api/user/progress', authenticateToken, (req, res) => {
  const { masteredQIds } = req.body;

  if (!Array.isArray(masteredQIds)) {
    return res.status(400).json({ success: false, message: 'masteredQIds must be an array' });
  }

  const db = loadDatabase();
  db.progress[req.user.id] = masteredQIds;
  saveDatabase(db);

  res.json({
    success: true,
    masteredQIds: db.progress[req.user.id]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Authentication & Database Backend API running on http://localhost:${PORT}`);
});
