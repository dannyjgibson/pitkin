var express = require('express'),
    loginRouter = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

loginRouter.use(function (req, res, next) {
  console.log('someone tried to login');
  next();
});

module.exports = function (passport) {

  loginRouter.get('/', function (req, res) {
    console.log(req.body);
    res.render('login');
  });
  
  loginRouter.post('/', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  loginRouter.get('/register', function (req, res) {
    res.render('register', {});
  });

  loginRouter.post('/register', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/login/register',
    failureFlash: true
  }));

  loginRouter.get('/sample',
    isAuthenticated,
    function (req, res) {
      console.log('logged in' + req.user.username);
    }
  );

  loginRouter.get('/logout', function (req, res) {
    console.log('someone logged out!');
    req.logout();
    res.redirect('/');
  });

  return loginRouter;
};
