var express = require('express'),
  bodyParser = require('body-Parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  fs = require('fs'),
  port = process.env.PORT || 3000,
  app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

//logging to console
app.use(morgan('dev'));

// connecting to db with mongoose, gonna need it for validation
mongoose.connect('mongodb://@localhost:27017/test');
console.log('connected to mongodb at localhost:27017/test');

app.param('collectionName', function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

//general routing
//entity-specific routing is handled in controllers
app.get('/', function (req, res) {
  // gonna want to serve something real here
  res.send('Welcome to the pitkin app');
});

// routers are modularized
require('./routers/apiRouter');

//registering routers
app.use('/api', apiRouter);

app.listen(port);
console.log('listening on port ' + port);