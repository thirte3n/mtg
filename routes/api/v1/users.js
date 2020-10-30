const express = require('express');
const usersRouter = express.Router();

const {
  getUsers,
  validateRequiredInput,
  checkUsernameExists,
  addUser,
} = require('../../../controllers/users');

usersRouter
  .route('/')
  .get(getUsers)
  .post(validateRequiredInput, checkUsernameExists, addUser);

module.exports = usersRouter;
