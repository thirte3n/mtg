const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = app;

// DB
const db =
  process.env.NODE_ENV === 'production'
    ? process.env.MongoURI
    : process.env.TEST_DATABASE;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      `Connected to ${
        db === process.env.MongoURI ? 'MongoDB database' : 'test database'
      }`,
    ),
  )
  .catch((err) => console.log(err));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const apiRouter = require('./routes/api/v1/api');

// @route /api/v1
app.use('/api/v1', apiRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
