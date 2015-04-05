var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  text: String,
//  from: User,
  timestamp: Date 

});

module.exports = mongoose.model('Message', messageSchema);