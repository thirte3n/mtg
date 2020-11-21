const express = require('express');
const usersRouter = express.Router();

const User = require('../../../models/User');

const {
  checkCompletePayload,
  checkEmptyPayload,
  validateInput,
  checkUsernameAvailability,
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../../../controllers/users');

// @route /api/v1/users
usersRouter
  .route('/')
  .get(getUsers)
  .post(
    checkCompletePayload,
    checkEmptyPayload,
    validateInput,
    checkUsernameAvailability,
    addUser,
  );

// @route /api/v1/users/:username
usersRouter.param('username', async (req, res, next, username) => {
  try {
    const user = await User.findOne({ username });

    if (user) {
      req.user = user;
      const { password, isAdmin, ...filteredUser } = user.toObject();
      req.filteredUser = filteredUser;
      next();
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        error: 'User does not exist',
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      status: 500,
      error: 'Server Error',
    });
  }
});

// @route /api/v1/users/:username
usersRouter
  .route('/:username')
  .get(getUser)
  .put(checkEmptyPayload, validateInput, updateUser)
  .delete(deleteUser);

module.exports = usersRouter;
