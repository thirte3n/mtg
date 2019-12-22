const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // Needed to decrypt the password hash

const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match username
      User.findOne({ username })
        .then(user => {
          if (!user) {
            // No user found
            // null(no error), false(no user),
            return done(null, false, { message: 'Username is not registered' });
          }

          // Check password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return console.log(err);

            // Password matches
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Incorrect password' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  // Serialize and Deserialize User to session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
