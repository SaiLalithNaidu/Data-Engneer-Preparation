import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import SessionToken from '../models/SessionToken.js';
import { isMongoConnected } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'de_prep_super_secret_jwt_key_2026_aws';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

// Generate JWT Helper
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export async function signUp(req, res) {
  const { fullName, email, password, targetRole } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields (fullName, email, password).'
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const role = targetRole || 'Data Engineer';
  const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  try {
    if (isMongoConnected()) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please Sign In.'
        });
      }

      // Hash password using bcryptjs
      const pwdHash = await User.hashPassword(password);

      const newUser = await User.create({
        id: userId,
        fullName: fullName.trim(),
        email: cleanEmail,
        passwordHash: pwdHash,
        targetRole: role
      });

      // Create initial progress record
      await Progress.create({ userId, masteredQIds: [], mockResults: [], bookmarks: [] });

      // Generate signed JWT token
      const token = generateToken({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        targetRole: newUser.targetRole
      });

      // Optionally record session token
      await SessionToken.create({ token, userId: newUser.id });

      console.log(`[MONGODB ATLAS AUTH] User Signed Up: ${newUser.email} (${newUser.fullName})`);

      return res.json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          targetRole: newUser.targetRole
        }
      });
    }

    return res.status(503).json({
      success: false,
      message: 'Database is currently connecting or unavailable. Please try again in a few seconds.'
    });

  } catch (err) {
    console.error('Sign Up Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error creating account.'
    });
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/signin
// @access  Public
export async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please enter both Email and Password.'
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    if (isMongoConnected()) {
      const user = await User.findOne({ email: cleanEmail });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No account found with this email. Please Sign Up.'
        });
      }

      // Check password using bcrypt or matchPassword helper
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password. Please try again.'
        });
      }

      // Generate signed JWT token
      const token = generateToken({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        targetRole: user.targetRole
      });

      // Save session token in database
      await SessionToken.create({ token, userId: user.id });

      console.log(`[MONGODB ATLAS AUTH] User Signed In: ${user.email}`);

      return res.json({
        success: true,
        token: token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          targetRole: user.targetRole
        }
      });
    }

    return res.status(503).json({
      success: false,
      message: 'Database connection offline. Please check server logs.'
    });

  } catch (err) {
    console.error('Sign In Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Server authentication error.'
    });
  }
}

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private (Protected by authMiddleware)
export async function getMe(req, res) {
  return res.json({
    success: true,
    user: req.user
  });
}
