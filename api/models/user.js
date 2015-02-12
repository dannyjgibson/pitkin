var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	articleCount: Number.
	articles: [userSchema]
});

exports = mongoose.model('User', userSchema);