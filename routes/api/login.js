const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');

// route /api/login
loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body.user;

  if (!username || !password) {
    return res.status(401).json({ message: 'Auth failed' });
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(401).json({ message: 'Auth failed' });
        }

        if (isMatch) {
          const token = jwt.sign(
            {
              username,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            });

          return res.status(200).json(
            {
              message: 'Auth successful',
              token
            });
        }

        res.status(401).json({ message: 'Auth failed' });

      });
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter;
