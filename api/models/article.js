var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    topic: String,
    title: String,
    publishDate: Date,
    updated: {type: Date, default: Date.now},}
    text: String,
    actions: String
});

exports = mongoose.model('Post', postSchema);
