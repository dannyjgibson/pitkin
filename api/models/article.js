var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    topic: String,
    title: String,
    publishDate: Date,
    updated: {type: Date, default: Date.now},}
    text: String,
    actions: String,
    tags: [String]
});

exports = mongoose.model('Article', articleSchema);
