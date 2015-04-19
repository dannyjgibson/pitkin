var express = require('express'),
    passport = require('passport'),
    config = require('../config'),
    User = require('../models/user'),
    loginRouter = express.Router();

loginRouter.use(function (req, res, next) {
  console.log('someone tried to login');
  next();
});

loginRouter.get('/', function (req, res) {
   res.render('login', { user: req.user });
});

loginRouter.get('/register', function (req, res) {
  res.render('register', {});
});

loginRouter.post('/register', function (req, res, next) {
  User.register(new User({ username: req.body.username}), req.body.password, function (err) {
    if (err) {
      return res.render('register', {info: err.message});
    }
    res.redirect('/');
  });
});

loginRouter.post('/',
  passport.authenticate('local',
   {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
);

loginRouter.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = loginRouter;