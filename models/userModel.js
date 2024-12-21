import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
  },
  googleId: {
    type: String,
    required: true,
    unique: true, // Store Google ID for unique identification
  },
  token: {
    type: String,
    required: true, // Storing the Google OAuth token
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
