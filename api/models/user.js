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
	var currentDate = new Date();
	this.updatedAt = currentDate;

	if (!this.createdAt) {
		this.createdAt = currentDate;
	}

	// hash password here

	// validate properties on save
	if (!validator.isEmail(this.emailAddress)) {
		// reject property
	}

	next();
});

// compare given password to the database hash
userSchema.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);
