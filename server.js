const express = require('express');
const app = express();
const mongoose = require('mongoose');

module.exports = app;

// DB config
const db = process.env.TEST_DATABASE || require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to ${db == process.env.TEST_DATABASE ? 'test database' : 'MongoDB Atlas'}`))
  .catch(err => console.log(err));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const apiRouter = require('./routes/api/api');

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
