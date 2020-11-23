const User = require('../models/User');
const bcrypt = require('bcryptjs');
const checkValidProperties = require('../utils/checkValidProperty');

exports.checkCompletePayload = (req, res, next) => {
  req.newUser = req.body.user;

  if (
    !req.newUser.username ||
    !req.newUser.firstName ||
    !req.newUser.lastName ||
    !req.newUser.password
  ) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  next();
};

exports.checkEmptyPayload = (req, res, next) => {
  if (!req.body || !req.body.user) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  next();
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
    theme,
    userRooms,
  } = req.newUser;

  const validProperties = [
    'username',
    'password',
    'isAdmin',
    'firstName',
    'lastName',
    'dateRegistered',
    'counter',
    'theme',
    'userRooms',
  ];

  if (Object.keys(req.newUser).length === 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  if (dateRegistered) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  if (!checkValidProperties(req.body.user, validProperties)) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  if (username) {
    if (username.length < 4 || username.length > 20) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (password) {
    if (password.length < 8 || password.length > 30) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (firstName?.length === 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  if (firstName) {
    if (firstName.length > 20) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (lastName?.length === 0) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  if (lastName) {
    if (lastName.length > 20) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (isAdmin) {
    if (!req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        status: 401,
        error: 'Unauthorized',
      });
    }

    if (typeof isAdmin !== 'boolean') {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (counter) {
    if (
      typeof counter.life !== 'number' ||
      typeof counter.poison !== 'number' ||
      typeof counter.land.plains !== 'number' ||
      typeof counter.land.island !== 'number' ||
      typeof counter.land.swamp !== 'number' ||
      typeof counter.land.mountain !== 'number' ||
      typeof counter.land.forest !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (theme) {
    if (!['plains', 'island', 'swamp', 'mountain', 'forest'].includes(theme)) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  if (userRooms && userRooms.length > 0) {
    if (userRooms.every((room) => typeof room.roomId !== 'number')) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }
  }

  next();
};

exports.checkUsernameAvailability = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.newUser.username });

    if (user) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Username is already taken',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: err,
    });
  }
};

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

/**
 * @route   POST /api/v1/users
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

/**
 * @route   GET /api/v1/users/:username
 * @desc    Get details of a single user
 * @access  Public
 */
exports.getUser = async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: 200,
    data: {
      user: req.filteredQueriedUser,
    },
  });
};

/**
 * @route   PUT /api/v1/users/:username
 * @desc    Update user information
 * @access  Private - owner or admin
 */
exports.updateUser = async (req, res, next) => {
  // HACK: You can't update only a select number of properties inside `counter`. In doing so, you will be able to update those property but will revert all the other properties inside `counter` to their default values.
  // If you're going to change any value inside `counter`, you must send the complete `counter` object with all its properties and values.
  // HACK: The same problem also goes for the userRooms array property
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.queriedUser.username },
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

/**
 * @route   DELETE /api/v1/users/:username
 * @desc    Delete a user
 * @access  Private - owner or admin
 */
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndRemove({ username: req.queriedUser.username });

    return res.status(200).json({
      success: true,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: err,
    });
  }
};
