const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Validate registration form
const validateInput = (req, res, next) => {
  const { username,  firstName, lastName, password, password2 } = req.body;

  let errors = [];

  if (!username || !firstName || !lastName || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (username.length < 4 || username.length > 20) {
    errors.push({ msg: 'Username must be between 4 to 20 characters'});
  }

  if (firstName.length < 1) {
    errors.push({ msg: 'First name cannot be empty'});
  }

  if (firstName.length > 20) {
    errors.push({ msg: 'First name cannot exceed 20 characters'});
  }

  if (lastName.length < 1) {
    errors.push({ msg: 'Last name cannot be empty'});
  }

  if (lastName.length > 20) {
    errors.push({ msg: 'Last name cannot exceed 20 characters'});
  }

  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 4 characters'});
  }

  // Validation passes
  if (!errors.length) {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          // Username is already taken
          errors.push({ msg: 'Username is already taken' });
          res.render('signup', {
            title: 'Create your Account',
            errors, username, firstName, lastName
          });
        } else {
          // Username is available - proceeds to password hashing and creating user
          req.username = username;
          req.firstName = firstName;
          req.lastName = lastName;
          req.password = password;
          next();
        }
      })
      .catch(err => console.log(err));
  } else {
    // Validation fails
    res.render('signup', {
      title: 'Create your account',
      errors, username, firstName, lastName
    });
  }
};

// route /users/signup
usersRouter.route('/signup')
  .get((req, res, next) => {
    res.render('signup', {
      title: 'Create your account'
    });
  })
  .post(validateInput, async (req, res, next) => {
    let newUser = new User({
      username: req.username,
      firstName: req.firstName,
      lastName: req.lastName,
      password: req.password
    });

    // Hash password and save newUser to database
    await bcrypt.genSalt(10)
      .then(salt => {
        bcrypt.hash(req.password, salt)
          .then(hash => {
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('msg_success', 'You have successfully created an account');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// route /users/login
usersRouter.route('/login')
  .get((req, res, next) => {
    res.render('login', {
      title: 'Log in'
    });
  })
  .post((req, res, next) => {
    res.render('dashboard', {
      title: 'MTG',
      username: req.body.username
    });
  });

// route /users/
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
