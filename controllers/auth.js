const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkValidProperties = require('../utils/checkValidProperty');

exports.checkCompletePayload = (req, res, next) => {
  req.newUser = req.body.user;

  if (!req.newUser.username || !req.newUser.password) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }

  next();
};

exports.validateInput = async (req, res, next) => {
  const validProperties = ['username', 'password'];

  if (!checkValidProperties(req.body.user, validProperties)) {
    return res.status(400).json({
      success: false,
      status: 400,
      error: 'Bad Request',
    });
  }
};

exports.checkUsernameExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.newUser.username });

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Bad Request',
      });
    }

    req.user = user;
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
 * @route   POST /api/v1/auth
 * @desc    Authenticate user and returns JWT token
 * @access  Public
 */
exports.validatePassword = (req, res, next) => {
  bcrypt.compare(req.newUser.password, req.user.password).then((isMatch) => {
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: 'Invalid credentials',
      });
    }

    jwt.sign(
      {
        id: req.user.id,
        username: req.user.username,
      },
      process.env.JWT_KEY,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        const { password, isAdmin, ...filteredUser } = req.user.toObject();

        return res.status(200).json({
          success: true,
          status: 200,
          data: {
            token,
            user: filteredUser,
          },
        });
      },
    );
  });
};
