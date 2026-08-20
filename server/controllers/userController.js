import Progress from '../models/Progress.js';
import { isMongoConnected } from '../config/db.js';

// @desc    Get user progress (mastered questions & mock scores)
// @route   GET /api/user/progress
// @access  Private
export async function getProgress(req, res) {
  try {
    if (isMongoConnected()) {
      const userProgress = await Progress.findOne({ userId: req.user.id });
      return res.json({
        success: true,
        masteredQIds: userProgress ? userProgress.masteredQIds : [],
        mockResults: userProgress ? userProgress.mockResults : []
      });
    }

    return res.json({
      success: true,
      masteredQIds: [],
      mockResults: []
    });
  } catch (err) {
    console.error('Fetch Progress Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch user progress' });
  }
}

// @desc    Update user progress (mastered questions)
// @route   POST /api/user/progress
// @access  Private
export async function updateProgress(req, res) {
  const { masteredQIds } = req.body;

  if (!Array.isArray(masteredQIds)) {
    return res.status(400).json({ success: false, message: 'masteredQIds must be an array' });
  }

  try {
    if (isMongoConnected()) {
      const updated = await Progress.findOneAndUpdate(
        { userId: req.user.id },
        { masteredQIds },
        { upsert: true, new: true }
      );
      return res.json({
        success: true,
        masteredQIds: updated.masteredQIds
      });
    }

    return res.json({
      success: true,
      masteredQIds
    });
  } catch (err) {
    console.error('Save Progress Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save progress' });
  }
}

// @desc    Get user bookmarks
// @route   GET /api/user/bookmarks
// @access  Private
export async function getBookmarks(req, res) {
  try {
    if (isMongoConnected()) {
      const prog = await Progress.findOne({ userId: req.user.id });
      return res.json({
        success: true,
        bookmarks: prog ? prog.bookmarks : []
      });
    }
    return res.json({ success: true, bookmarks: [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// @desc    Update user bookmarks
// @route   POST /api/user/bookmarks
// @access  Private
export async function updateBookmarks(req, res) {
  const { bookmarks } = req.body;

  if (!Array.isArray(bookmarks)) {
    return res.status(400).json({ success: false, message: 'bookmarks must be an array' });
  }

  try {
    if (isMongoConnected()) {
      const updated = await Progress.findOneAndUpdate(
        { userId: req.user.id },
        { bookmarks },
        { upsert: true, new: true }
      );
      return res.json({
        success: true,
        bookmarks: updated.bookmarks
      });
    }

    return res.json({ success: true, bookmarks });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// @desc    Save mock test quiz result
// @route   POST /api/user/mock-result
// @access  Private
export async function saveMockResult(req, res) {
  const { topicId, score, totalQuestions } = req.body;

  if (!topicId || score === undefined || !totalQuestions) {
    return res.status(400).json({ success: false, message: 'topicId, score, and totalQuestions are required' });
  }

  try {
    if (isMongoConnected()) {
      const updated = await Progress.findOneAndUpdate(
        { userId: req.user.id },
        { $push: { mockResults: { topicId, score, totalQuestions, completedAt: new Date() } } },
        { upsert: true, new: true }
      );
      return res.json({
        success: true,
        mockResults: updated.mockResults
      });
    }

    return res.json({ success: true, mockResults: [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
