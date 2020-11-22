const express = require('express');
const authRouter = express.Router();

const {
  checkCompletePayload,
  validateInput,
  checkUsernameExists,
  validatePassword,
} = require('../../../controllers/auth');

const { checkEmptyPayload } = require('../../../controllers/users');

// @route /api/v1/auth
authRouter.post(
  '/',
  checkCompletePayload,
  checkEmptyPayload,
  validateInput,
  checkUsernameExists,
  validatePassword,
);

module.exports = authRouter;
