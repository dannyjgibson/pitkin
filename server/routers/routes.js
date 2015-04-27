var express = require('express'),
    routes = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).redirect('/login');
};

routes.use(function (req, res, next) {
  console.log('someone tried to hit the app');
  next();
});

module.exports = function (passport) {

  routes.get('/', function (req, res) {
    res.status(200).render('home', {title: 'Pitkin Home', user: req.user});
  });

  routes.get('/login', function (req, res) {
    console.log(req.body);
    res.status(200).render('login', {title: 'Pitkin Login'});
  });
  
  routes.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  routes.get('/register', function (req, res) {
    res.status(200).render('register', {title: 'Pitkin Register'});
  });

  routes.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }));

  routes.get('/write', 
    isAuthenticated,
    function (req, res) {
      res.status(200).render('notepad', {user: req.user, title: 'Pitkin Notepad'});
    }
  );

  routes.get('/search', 
    isAuthenticated,
    function(req, res) {
      res.status(200).render('search', {user: req.user, title: 'Pitkin Search'});
    }
  );

  routes.get('/logout', function (req, res) {
    console.log('someone logged out!');
    req.logout();
    res.status(200).redirect('/login');
  });

  return routes;
};
