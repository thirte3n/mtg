const express = require('express');
const indexRouter = express.Router();
const { ensureAuthenticated, alreadyAuthenticated } = require('../controllers/auth');

indexRouter.get('/', alreadyAuthenticated, (req, res) => {
  res.render('home', {
    title: 'MTG'
  });
});

indexRouter.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'MTG',
    name: req.user.firstName + ' ' + req.user.lastName,
    isAdmin: req.user.isAdmin
  });
});

module.exports = indexRouter;
