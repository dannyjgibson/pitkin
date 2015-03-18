var express = require('express'),
    fs = require('fs');
   
var loginRouter = express.Router();
// need to set up a little middlware on the router before passing 

loginRouter.use(function (req, res, next) {
  console.log('someone hit our login!');

  next();
});

loginRouter.get('/', function (req, res) {
  // list verbs and routes on html page to serve
  res.send('Welcome, please log in...');
});

loginRouter.post('/', function (req, res) {
  console.log('processing');
  res.send('processing the login form!');
});
   
var UserController = require('../controllers/user-controller.js');
var userController = new UserController(loginRouter);
module.exports = loginRouter;   