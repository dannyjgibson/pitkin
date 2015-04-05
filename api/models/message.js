var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
  text: String,
  from: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  timestamp: Date 
});

module.exports = mongoose.model('Message', messageSchema);