const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required',
    minlength: 4,
    maxlength: 20,
    trim: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: 'First name is required',
    minlength: 1,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: 'Last name is required',
    minlength: 1,
    maxlength: 20,
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: 8,
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
