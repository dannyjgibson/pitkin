var mongoose = require('mongoose'),
  validator = require('validator'),
  passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  emailAddress: String,
  articleCount: Number,
  articles: 
            [
              {type: mongoose.Schema.Types.Mixed, ref:'Article'}, // Maybe I keep this as objectId and store articles elsewhere
            ],
  createdAt: Date,
  updatedAt: Date,
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

//abstract this out
userSchema.pre('save', function (next) {
  var currentDate = new Date(),
      user = this;
  user.updatedAt = currentDate;

  if (!this.createdAt) {
    user.createdAt = currentDate;
  }
  // validate properties on save
  if (!validator.isEmail(user.emailAddress)) {
    // reject property
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
