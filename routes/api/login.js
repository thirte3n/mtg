const express = require('express');
const loginRouter = express.Router();

const User = require('../../models/User');

// route /api/login
loginRouter.post('/', (req, res, next) => {

});

module.exports = loginRouter;

// TODO: https://youtu.be/0D5EEKH97NA?t=492
