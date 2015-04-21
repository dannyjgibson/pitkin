var express = require('express'),
    routes = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

routes.use(function (req, res, next) {
  console.log('someone tried to hit the app');
  next();
});

module.exports = function (passport) {

  routes.get('/', function (req, res) {
    res.render('home', {title: 'Pitkin Home', user: req.user});
  });

  routes.get('/login', function (req, res) {
    console.log(req.body);
    res.render('login', {title: 'Pitkin login'});
  });
  
  routes.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  routes.get('/register', function (req, res) {
    res.render('register', {title: 'Pitkin register'});
  });

  routes.post('/register', passport.authenticate('register', {
    successRedirect: '/write',
    failureRedirect: '/register',
    failureFlash: true
  }));

  routes.get('/write', 
    isAuthenticated,
    function (req, res) {
      res.render('notepad', {user: req.user, title: 'Pitkin Notepad'});
    }
  );

  routes.get('/logout', function (req, res) {
    console.log('someone logged out!');
    req.logout();
    res.redirect('/login');
  });

  return routes;
};
