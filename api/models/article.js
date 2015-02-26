var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	id: String,
    topic: String,
    title: String,
    location: String,
    publishDate: Date,
    createdAt: Date,
    updatedAt: Date,
    text: String,
    actions: String,
    tags: [String]
});

articleSchema.pre('save', function (next) {
	var currentDate = new Date();
	this.updatedAt = currentDate;

	if (!this.createdAt) {
		this.createdAt = currentDate;
	} 
	next();
});

exports = mongoose.model('Article', articleSchema);
