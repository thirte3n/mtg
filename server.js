const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

module.exports = app;

// DB config
const db = process.env.TEST_DATABASE || require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`Connected to ${db == process.env.TEST_DATABASE ? 'test database' : 'MongoDB Atlas'}`))
  .catch(err => console.log(err));

// Template Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const apiRouter = require('./routes/api/api');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
