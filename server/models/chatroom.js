var mongoose = require('mongoose'),
    userSchema = require('./user.js'),
    chatServer = require('../../chat/index');

var chatroomSchema = new mongoose.Schema({
	namespaceId: String,
  text: String,
	users:
        [
          {type: mongoose.Schema.Types.ObjectId, ref:'User'}
        ]
});

chatroomSchema.pre('save', function (next) {
  var chatroom = this;
//  chatServer.setupNamespace(chatroom.namespaceId);
  next();
});

module.exports = mongoose.model('ChatRoom', chatroomSchema);