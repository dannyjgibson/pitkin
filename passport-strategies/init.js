var login = require('./login'),
    register = require('./register'),
    User = require('../api/models/user');

module.exports = function (passport) {
  
  // serializing and deserializing user supports persistent login sessions
  passport.serializeUser(function (user, done) {
    console.log('serializing user: ' + user );
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('deserializing user: ' + user);
      done(err, user);
    });
  });

  // set up login and register strategies
  login(passport);
  register(passport); 
};