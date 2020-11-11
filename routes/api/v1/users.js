const express = require('express');
const usersRouter = express.Router();

const {
  getUsers,
  validateRequiredInput,
  checkUsernameExists,
  addUser,
  getUser,
} = require('../../../controllers/users');

usersRouter
  .route('/')
  .get(getUsers)
  .post(validateRequiredInput, checkUsernameExists, addUser);

usersRouter.route('/:username').get(getUser);

module.exports = usersRouter;
