const express = require('express');
const usersRouter = express.Router();

const { getUsers } = require('../../../controllers/users');

usersRouter.route('/').get(getUsers);

module.exports = usersRouter;
