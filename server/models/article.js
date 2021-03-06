var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  topic: String,
  title: String,
  author: {type: mongoose.Schema.Types.Mixed, ref:'User'}, 
  location: String,
  publishDate: Date,
  createdAt: Date,
  updatedAt: Date,
  text: String,
  tags: [String],
  offensiveToSomeone: Boolean
});

articleSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  } 
  next();
});

module.exports = mongoose.model('Article', articleSchema);
