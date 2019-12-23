const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

module.exports = app;

// Passport local strategy config
require('./config/passport')(passport);

// DB config
// const db = process.env.TEST_DATABASE || require('./config/keys').MongoURI;
const db = process.env.TEST_DATABASE || process.env.MongoURI;

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

// Public directory
app.use(express.static('public'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Morgan logging
app.use(morgan('tiny'));

// express-session
app.use(session({
  secret: 'keyboard cat',
  resave: true, // changed to true (docs was fallse)
  saveUninitialized: true
  // cookie: { secure: true } // commented out
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// connect-flash
// Saves to req.flash object
app.use(flash());

// Global variables - to use req.flash messages in template engines
app.use((req, res, next) => {
  // Saves req.flash messages to global variables (res.locals)
  res.locals.msg_success = req.flash('msg_success');
  res.locals.msg_error = req.flash('msg_error');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
const apiRouter = require('./routes/api/api');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const errorsRouter = require('./routes/errors');

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('*', errorsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
