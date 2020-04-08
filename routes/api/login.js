const express = require('express');
const bcrypt = require('bcryptjs');
const loginRouter = express.Router();

const User = require('../../models/User');

// TODO: LOGIN
// Reference '../../config/passport.js'
// route /api/login
loginRouter.post('/', (req, res, next) => {
  const { username, password } = req.body.user;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.sendStatus(400);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return console.log(err);

        if (isMatch) {
          res.status(200).json({ message: 'You have successfully logged in' });
        } else {
          res.sendStatus(400);
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter;

// TODO: JWT https://youtu.be/0D5EEKH97NA?t=492
