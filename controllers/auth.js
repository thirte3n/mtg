const jwt = require('jsonwebtoken');

module.exports = {
  // controllers for server-side rendering

  ensureAuthenticated: function(req, res, next) {
    // req.isAuthenticated is made by passport
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('msg_error', 'Please log in to view this resource');
    res.redirect('/users/login');
  },
  // Redirect users to /dashboard if they are already logged in
  alreadyAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
  ensureAdminRights: function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }

    req.flash('msg_error', 'You do not have the rights to view this resource');
    res.redirect('/dashboard');
  },

  // controllers for API

  checkAuth: function(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(
        token,
        process.env.JWT_KEY
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  }
};
