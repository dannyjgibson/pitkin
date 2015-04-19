var express = require('express'),
    routes = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

routes.use(function (req, res, next) {
  console.log('someone tried to hit the app');
  next();
});

module.exports = function (passport) {

  routes.get('/login', function (req, res) {
    console.log(req.body);
    res.render('login');
  });
  
  routes.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

  routes.get('/register', function (req, res) {
    res.render('register', {});
  });

  //not sure why I have to POST to /login/register
  routes.post('/register', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true
  }));

  routes.get('/sample',
    isAuthenticated,
    function (req, res) {
      console.log('logged in ' + req.user.username);
    }
  );

  routes.get('/write', 
    isAuthenticated,
    function (req, res) {
      res.render('write', req.user);
    }
  );

  routes.get('/logout', function (req, res) {
    console.log('someone logged out!');
    req.logout();
    res.redirect('/login');
  });

  return routes;
};
