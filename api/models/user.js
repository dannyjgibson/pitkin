var mongoose = require('mongoose'),
	validator = require('validator'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	emailAddress: String,
	articleCount: Number,
	articles: 
						[
							{type: mongoose.Schema.Types.ObjectId, ref:'Article'},
						],
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

var changePassword = function (accountId, newPassword) {
	var newHashedPassword = hashPassword(newPassword);
	userSchema.update({_id:accountId}, {$set: {password: newHashedPassword}}, {upsert: false});
	console.log('change password for ' + accountId);
};

var login = function (email, password, next) {
	userSchema.findOne({email: email, password: hashPassword(password)}, function(err, doc) {
		next(doc !== null);
	});
};

userSchema.statics.comparePassword = comparePassword;
userSchema.statics.hashPassword = hashPassword;

module.exports = mongoose.model('User', userSchema);