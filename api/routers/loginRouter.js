var express = require('express'),
    passport = require('passport'),
    path = require('path'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('../config'),
    User = require('../controllers/user-controller'),
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
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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