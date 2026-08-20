import express from 'express';
import {
  getProgress,
  updateProgress,
  getBookmarks,
  updateBookmarks,
  saveMockResult
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected user progress & bookmark endpoints
router.get('/progress', protect, getProgress);
router.post('/progress', protect, updateProgress);
router.get('/bookmarks', protect, getBookmarks);
router.post('/bookmarks', protect, updateBookmarks);
router.post('/mock-result', protect, saveMockResult);

export default router;
