import express from 'express';
import { signUp, signIn, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth endpoints
router.post('/signup', signUp);
router.post('/signin', signIn);

// Protected auth endpoints
router.get('/me', protect, getMe);

export default router;
