var mongoose = require('mongoose'),
	validator = require('validator'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	emailAddress: String,
	articleCount: Number,
	articles: [userSchema],
	createdAt: Date,
	updatedAt: Date,
});

//abstract this out
userSchema.pre('save', function (next) {
	var currentDate = new Date(),
			user = this;
	user.updatedAt = currentDate;

	if (!this.createdAt) {
		user.createdAt = currentDate;
	}

	// hash password here
	if (!user.isModified('password')) {
		return next();
	}	

	user.password = hashPassword(user.password);

	// validate properties on save
	if (!validator.isEmail(user.emailAddress)) {
		// reject property
	}
	next();
});

var hashPassword =  function (rawPassword) {
	console.log("we're going to test " + rawPassword);
	return bcrypt.genSalt(1, function (err, salt) {
		if (err) {
			throw err;
		}
		return bcrypt.hash(rawPassword, salt, null, function (err, encryptedPassword) {
			if (err) {
				throw err;
			}
			return encryptedPassword;
		});
	});
};


userSchema.statics.comparePassword = function (candidatePassword, knownPassword, next) {
	console.log('candidatePassword is ' + candidatePassword);
	console.log('knownPassword is ' + knownPassword);
	bcrypt.compare(candidatePassword, knownPassword, function (err, isMatch) {
		if (err) {
			return next(err);
		}
		next(null, isMatch);
	});
};

userSchema.statics.hashPassword = hashPassword;

module.exports = mongoose.model('User', userSchema);
