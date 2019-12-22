const express = require('express');
const indexRouter = express.Router();
const { ensureAuthenticated } = require('../controllers/auth');

indexRouter.get('/', (req, res) => {
  res.render('home', {
    title: 'MTG'
  });
});

indexRouter.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'MTG',
    name: req.user.firstName + ' ' + req.user.lastName
  });
});

module.exports = indexRouter;
