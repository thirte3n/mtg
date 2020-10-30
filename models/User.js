const mongoose = require('mongoose');
// mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required',
    minlength: 4,
    maxlength: 20,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: 8,
    maxlength: 30,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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
  dateRegistered: {
    type: Date,
    default: Date.now,
  },
  counter: {
    life: {
      type: Number,
      default: 20,
    },
    poison: {
      type: Number,
      default: 0,
    },
    land: {
      plains: {
        type: Number,
        default: 0,
      },
      island: {
        type: Number,
        default: 0,
      },
      swamp: {
        type: Number,
        default: 0,
      },
      mountain: {
        type: Number,
        default: 0,
      },
      forest: {
        type: Number,
        default: 0,
      },
    },
  },
  theme: {
    type: String,
    default: 'plains',
  },
  userRooms: [
    {
      roomId: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
