var express = require('express'),
	mongoskin = require('mongoskin'),
	bodyParser = require('body-parser'),
	app = express(),
	db = mongoskin.db('mongodb://@localhost:27017/pitkin-test', {safe: true});

app.use(bodyParser());

app.param('collectionName', function (req, res, next, collectionName) {
	req.collection = db.collection(collectionName);
	return next();
})

app.get('/collection/:collectionName', function (req, res, next) {
	req.collection.find({}, {limit: 10, sort: [['_id', -1]]}).toArray(function (e, results) {
		if (e) {
			return next(e);
		}
		res.send(results);
	})
})