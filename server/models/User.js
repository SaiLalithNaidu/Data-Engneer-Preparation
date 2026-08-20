import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  targetRole: {
    type: String,
    default: 'Data Engineer'
  }
}, {
  timestamps: true
});

// Instance method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Support both bcrypt hashes and fallback legacy sha256 hashes if any
  if (this.passwordHash.startsWith('$2a$') || this.passwordHash.startsWith('$2b$')) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
  }
  return false;
};

// Static method to hash password
UserSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
