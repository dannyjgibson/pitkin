var mongoose = require('mongoose'),
    userSchema = require('./user.js');

var chatroomSchema =  new mongoose.Schema({
	text: String,
	users: [userSchema]
});

exports = mongoose.model('ChatRoom', chatroomSchema);