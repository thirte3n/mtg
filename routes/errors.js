const express = require('express');
const errorsRouter = express.Router();

errorsRouter.use((req, res, next) => {
  res.status(404).render('error', {
    title: '404: File Not Found',
    is404: true
  });
});

errorsRouter.use((err, req, res, next) => {
  res.status(500).render('error', {
    title: '500: Internal Server Errror',
    is500: true,
    error: err
  });
});
module.exports = errorsRouter;
