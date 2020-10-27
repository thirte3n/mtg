const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');

// @route /api/v1/users
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
