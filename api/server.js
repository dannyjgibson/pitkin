var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  expressSession = require('express-session'),
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware set up on server
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(flash());
app.use(express.static(__dirname, 'public'));

// passport configuration
app.use(expressSession({ secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());


// LOGIC below is moving into a custom strategy
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
var initializePassport = require('../passport-strategies/init');
initializePassport(passport);

// enable CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

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
//router specific routing is handled in /routers
app.get('/', function (req, res) {
  console.log('from get /');
  console.log(req.user);
  // gonna want to serve something real here
  res.send('Welcome to the pitkin app');
});

// routers are modularized
var apiRouter = require('./routers/apiRouter');
var loginRouter = require('./routers/loginRouter')(passport);

// registering routers
app.use('/api', apiRouter);
app.use('/login', loginRouter);

// // error handlers
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', { // need to build an error view
//       message: err.message,
//       error: err
//     });
//   });
// }

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', { // need to build an error view
//     message: err.message,
//     error: {}
//   });
// });

app.listen(port);
console.log('listening on port ' + port + ' for server');

module.exports = app;