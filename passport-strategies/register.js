var LocalStrategy = require('passport-local').Strategy,
    User = require('../api/models/user'),
    bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
  passport.use('register', new LocalStrategy({
      passReqToCallback: true 
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        User.findOne({'username': username}, function (err, user) {
          if (err) {
            done(err);
          }
          if (user) {
            console.log('user exists with username: ' + username);
            return done(null, false, req.flash('message', 'User already exists'));
          }

          var newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.createdAt = new Date();

          newUser.save(function (err) {
            if (err) {
              console.log('error in saving user' + err);
              throw err;
            }
            console.log('user registered');
            return done(null, newUser);
          });
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );

  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};