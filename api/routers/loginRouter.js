var flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    path = require('path'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('../config'),
    User = require('../models/user'),
    loginRouter = express.Router();

loginRouter.use(function (req, res, next) {
  console.log('someone tried to login');
  next();
});
passport.use(new LocalStrategy(
  function(username, password, next) {
    User.findOne({username: username}, function (err, user) {
      if (err) {
        return next(err); 
      }
      if (!user) {
        console.log('wrong username');
        return next(null, false, {message: 'Incorrect username.'});
      }
      if (!user.validPassword(password)) {
        console.log('wrong password!');
        return next(null, false, { message: 'Incorrect password.' });
      }
      return next(null, user);
    });
  }
));


loginRouter.use(express.static(__dirname, '/public'));

// displays the login page
loginRouter.get('/', function (req, res) {
  // want to render login page, but with user passed in
  res.sendFile(path.join(__dirname + '/../views/login.html'));
});

//posting to login
loginRouter.post('/',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  })
);

module.exports = loginRouter;