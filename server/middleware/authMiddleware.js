import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SessionToken from '../models/SessionToken.js';
import { isMongoConnected } from '../config/db.js';

export async function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'de_prep_super_secret_jwt_key_2026_aws';

  try {
    // 1. First try verifying signed JWT
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded && decoded.id) {
        req.user = {
          id: decoded.id,
          fullName: decoded.fullName,
          email: decoded.email,
          targetRole: decoded.targetRole || 'Data Engineer'
        };
        return next();
      }
    } catch (jwtErr) {
      // Token wasn't a standard JWT or was signed differently, fall back to SessionToken DB lookup below
    }

    // 2. Fallback to MongoDB SessionToken collection lookup
    if (isMongoConnected()) {
      const session = await SessionToken.findOne({ token });
      if (session) {
        const user = await User.findOne({ id: session.userId });
        if (user) {
          req.user = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            targetRole: user.targetRole
          };
          return next();
        }
      }
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token. Please sign in again.'
    });
  } catch (err) {
    console.error('[AUTH MIDDLEWARE ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'Server authentication error'
    });
  }
}
