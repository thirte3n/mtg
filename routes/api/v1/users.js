const express = require('express');
const usersRouter = express.Router();

const User = require('../../../models/User');

const {
  getUsers,
  checkRequiredInput,
  validateInput,
  checkUsernameExists,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../../../controllers/users');
const e = require('express');

usersRouter
  .route('/')
  .get(getUsers)
  .post(checkRequiredInput, validateInput, checkUsernameExists, addUser);

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

usersRouter
  .route('/:username')
  .get(getUser)
  .put(validateInput, updateUser)
  .delete(deleteUser);

module.exports = usersRouter;
