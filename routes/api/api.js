const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
const loginRouter = require('./login');

apiRouter.use('/users', usersRouter);
apiRouter.use('/login', loginRouter);

module.exports = apiRouter;
