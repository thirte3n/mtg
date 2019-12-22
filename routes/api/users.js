const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

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

const checkUsernameExists = (req, res, next) => {
  User.findOne({ username: req.newUsername })
    .then(user => {
      if (user) {
        res.sendStatus(400);
      } else {
        next();
      }
    })
    .catch(err => console.log(err));
}

// route /api/users
usersRouter.route('/')
  .get((req, res, next) => {
    User.find({}).select('username')
      .then(users => {
        res.json({ users: users });
      })
      .catch(err => { throw new Error(err); });
  })

  .post(validateInput, checkUsernameExists, async (req, res, next) => {
    let newUser = new User({
      username: req.newUsername,
      firstName: req.newFirstName,
      lastName: req.newLastName,
      password: req.newPassword
    });

    // Hash password and save newUser to database
    await bcrypt.genSalt(10)
      .then(salt => {
        bcrypt.hash(req.newPassword, salt)
          .then(hash => {
            newUser.password = hash;
            // newUser.save(err => {
            //   if (err) console.log(err);
            //   res.status(201).json({ user: newUser });
            // });
            newUser.save()
              .then(user => {
                res.status(201).json({ user });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

usersRouter.param('username', (req, res, next, username) => {
  User.findOne({ username })
    .then(user => {
      if (user) {
        req.user = user;
        req.username = username;
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => { throw new Error(err); });
});

// route /api/users/:username
usersRouter.route('/:username')
  .get((req, res, next) => {
    res.status(200).json({ user: req.user });
  })

  .put(validateInput, async (req, res, next) => {
    User.findOne({ username: req.username })
      .then(user => {
        user.username = req.newUsername;
        user.firstName = req.newFirstName;
        user.lastName = req.newLastName;
        user.password = req.newPassword;

        bcrypt.compare(req.newPassword, req.user.password)
          .then(isMatch => {
            if (isMatch) {
              // Password is not being updated
              // Saves existing hash as req.newPassword
              user.password = req.user.password;
              user.save()
                .then(() => {
                  res.status(200).json({ user });
                })
                .catch(err => { throw new Error(err); });
            } else {
              // Password is being updated
              // Hash the password
              bcrypt.genSalt(10)
                .then(salt => {
                  bcrypt.hash(req.newPassword, salt)
                    .then(hash => {
                      user.password = hash;
                      user.save()
                        .then(() => {
                          res.status(200).json({ user });
                        })
                        .catch(err => { throw new Error(err); });
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));


      })
      .catch(err => { throw new Error(err); });

  })

  .delete((req, res, next) => {
    User.findOneAndRemove({ username: req.username })
      .then(() => res.sendStatus(200))
      .catch(err => { throw new Error(err); });
  });

module.exports = usersRouter;
