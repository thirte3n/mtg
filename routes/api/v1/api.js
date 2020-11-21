const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
const authRouter = require('./auth');

// @route /api/v1/users
apiRouter.use('/users', usersRouter);
// @route /api/v1/auth
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
