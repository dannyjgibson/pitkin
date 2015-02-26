var mongoose = require('mongoose');

var chatroomSchema =  new mongoose.Schema({
	id: String,
	text: String,
	users: [userSchema]
});

exports = mongoose.model('ChatRoom', chatroomSchema);