const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @route   GET /api/v1/users
 * @desc    Get list of all users
 * @access  Public
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password -isAdmin');

    return res.status(200).json({
      success: true,
      status: 200,
      count: users.length,
      data: users,
    });
  } catch {
    return res.status(500).json({
      success: false,
      status: 500,
      error: 'Server Error',
    });
  }
};

exports.validateRequiredInput = (req, res, next) => {
  req.newUser = req.body.user;
  const { username, firstName, lastName, password } = req.newUser;

  if (
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    username.length < 4 ||
    username.length > 20 ||
    firstName.length < 1 ||
    firstName.length > 20 ||
    lastName.length < 1 ||
    lastName.length > 20 ||
    password.length < 8 ||
    password.length > 30
  ) {
    res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  } else {
    next();
  }
};

exports.checkUsernameExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.newUser.username });

    if (user) {
      res.status(400).json({
        success: false,
        status: 400,
        error: 'Username is already taken',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: err,
    });
  }
};

/**
 * @route   POST /api/users
 * @desc    Add user
 * @access  Public
 */
exports.addUser = async (req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      req.newUser.password = hash;

      try {
        const newUser = await User.create({
          username: req.newUser.username,
          firstName: req.newUser.firstName,
          lastName: req.newUser.lastName,
          password: req.newUser.password,
        });

        const { password, isAdmin, ...newFilteredUser } = newUser.toObject();

        return res.status(201).json({
          success: true,
          status: 201,
          data: {
            user: newFilteredUser,
          },
        });
      } catch (err) {
        if (err.name === 'ValidationError') {
          // Catch mongoose model validation error
          const messages = Object.values(err.errors).map(
            (value) => value.message,
          );

          return res.status(400).json({
            success: false,
            status: 400,
            error: messages,
          });
        } else {
          return res.status(500).json({
            success: false,
            status: 500,
            error: err,
          });
        }
      }
    });
  });
};

exports.getUser = async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: 200,
    data: {
      user: req.filteredUser,
    },
  });
};

exports.validateInput = async (req, res, next) => {
  req.newUser = req.body.user;
  const {
    username,
    password,
    isAdmin,
    firstName,
    lastName,
    dateRegistered,
    counter,
  } = req.newUser;

  if (dateRegistered) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  next();
};

exports.updateUser = async (req, res, next) => {
  // HACK: You can't update only a select number of properties inside `counter`. In doing so, you will be able to update those property but will revert all the other properties inside `counter` to their default values.
  // If you're going to change any value inside `counter`, you must send the complete `counter` object with all its properties and values.
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      { ...req.body.user },
      { new: true, projection: '-password -isAdmin' },
    );

    return res.status(200).json({
      success: true,
      status: 200,
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndRemove({ username: req.user.username });

    res.status(200).json({
      success: true,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: err,
    });
  }
};
