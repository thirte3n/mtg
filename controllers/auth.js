module.exports = {
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
  }
};
