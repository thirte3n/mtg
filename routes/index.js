const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.render('home', {
    title: 'MTG'
  });
});

indexRouter.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: "MTG",
    username: req.user.username
  });
});

module.exports = indexRouter;
