const express = require('express');
const indexRouter = express.Router();
const { ensureAuthenticated, alreadyAuthenticated } = require('../controllers/auth');

indexRouter.get('/', alreadyAuthenticated, (req, res) => {
  res.render('home');
});

indexRouter.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { css: ['life-counter.css'] });
});

module.exports = indexRouter;
