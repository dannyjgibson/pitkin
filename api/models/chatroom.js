var mongoose = require('mongoose');

var chatroomSchema =  new mongoose.Schema({
	text: String,
	users: [userSchema]
});

exports = mongoose.model('ChatRoom', chatroomSchema);