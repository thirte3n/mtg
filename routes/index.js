const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.render('home', {
    title: 'MTG'
  });
});

module.exports = indexRouter;
