const express = require('express');
const usersRouter = express.Router();

const User = require('../../models/User');

usersRouter.route('/')
  .get((req, res, next) => {
    User.find({})
      .then(users => {
        res.json(users);
      })
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    const { username, firstName, lastName, password } = req.body;
    const newUser = new User({
      username,
      firstName,
      lastName,
      password
    });
    newUser.save(err => {
      if (err) console.log(err);
      console.log(req.body);
      res.json(newUser);
    });
  });

module.exports = usersRouter;
