var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('cookie-session'),
  flash = require('connect-flash'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  config = require('./config'),
  port = config.port,
  User = require('./models/user'),
  app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname, 'public'));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// enable CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(config.database.test, function (err) {
  if (err) {
    console.log('could not connect to' + config.database.test);    
  } 
  console.log('connected to mongodb at ' + config.database.test);
});

app.param('collectionName', function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  console.log("hit the collection: " + collectionName);
  return next();
});

//general routing
//entity-specific routing is handled in controllers
app.get('/', function (req, res) {
  // gonna want to serve something real here
  res.send('Welcome to the pitkin app');
});

// routers are modularized
var apiRouter = require('./routers/apiRouter');
var loginRouter = require('./routers/loginRouter');

// registering routers
app.use('/api', apiRouter);
app.use('/login', loginRouter);

// error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);
console.log('listening on port ' + port + ' for server');

module.exports = app;