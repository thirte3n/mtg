const express = require('express');
const usersRouter = express.Router();
const User = require('../models/User');

// TODO
const validateInput = (req, res, next) => {
  req.newUsername = req.body.user.username;
  req.newFirstName = req.body.user.firstName;
  req.newLastName = req.body.user.lastName;
  req.newPassword = req.body.user.password;

  if (!req.newUsername || !req.newFirstName || !req.newLastName || !req.newPassword || req.newUsername.length < 4 || req.newUsername.length > 20 || req.newFirstName.length < 1 || req.newFirstName.length > 20 || req.newLastName.length < 1 || req.newLastName.length > 20 || req.newPassword.length < 8 || req.newPassword.length > 20) {
    res.sendStatus(400);
  } else {
    next();
  }
};

usersRouter.route('/signup')
  .get((req, res, next) => {
    res.render('signup', {
      title: 'Create your account'
    });
  })
  .post(validateInput, (req, res, next) => {

  });

usersRouter.route('/login')
  .get((req, res, next) => {
    res.render('login', {
      title: 'Log in'
    });
  });

usersRouter.get('/', (req, res, next) => {
  User.find({})
    .then(users => {
      res.render('users', {
        title: 'Users',
        users: users
      });
    });
});

module.exports = usersRouter;
