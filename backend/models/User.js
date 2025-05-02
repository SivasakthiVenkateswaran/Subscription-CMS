const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean,
  profilePicture: String
});

module.exports = mongoose.model('User', UserSchema);
