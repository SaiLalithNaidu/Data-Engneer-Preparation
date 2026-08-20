import mongoose from 'mongoose';

const SessionTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d' // Automatically expire inactive sessions after 30 days
  }
});

const SessionToken = mongoose.models.SessionToken || mongoose.model('SessionToken', SessionTokenSchema);
export default SessionToken;
