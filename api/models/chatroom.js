var mongoose = require('mongoose'),
    userSchema = require('./user.js');

var chatroomSchema = new mongoose.Schema({
	namespaceId: String,
  text: String,
	users: [userSchema]
});

module.exports = mongoose.model('ChatRoom', chatroomSchema);