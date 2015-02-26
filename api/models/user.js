var mongoose = require('mongoose'),
	validator = require('validator.js');

var userSchema = new mongoose.Schema({
	id: String,
    username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	emailAddress: String,
	articleCount: Number,
	articles: [userSchema],
	createdAt: Date,
	updatedAt: Date,
});

//abstract this out

userSchema.methods.pre('save', function (next) {
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

exports = mongoose.model('User', userSchema);
