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

var hashPassword = function (rawPassword) {
	return bcrypt.hashSync(rawPassword);
};

var comparePassword = function (candidate, hashed) {
	return bcrypt.compareSync(candidate, hashed);
};

userSchema.statics.comparePassword = comparePassword;
userSchema.statics.hashPassword = hashPassword;

module.exports = mongoose.model('User', userSchema);
