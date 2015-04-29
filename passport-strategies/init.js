var login = require('./login'),
    register = require('./register'),
    User = require('../server/models/user');

module.exports = function (passport) {
  
  // serializing and deserializing user supports persistent login sessions
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // set up login and register strategies
  login(passport);
  register(passport); 
};