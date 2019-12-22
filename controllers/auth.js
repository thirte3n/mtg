module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // req.isAuthenticated is made by passport
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('msg_error', 'Please log in to view this resource');
    res.redirect('/users/login');
  }
};
