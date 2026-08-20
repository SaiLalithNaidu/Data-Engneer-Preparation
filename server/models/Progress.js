import mongoose from 'mongoose';

const MockResultSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now }
}, { _id: false });

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  masteredQIds: {
    type: [String],
    default: []
  },
  mockResults: {
    type: [MockResultSchema],
    default: []
  },
  bookmarks: {
    type: [String],
    default: []
  },
  notes: {
    type: Map,
    of: String,
    default: {}
  }
}, {
  timestamps: true
});

const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
export default Progress;
