var express = require('express'),
	mongoskin = require('mongoskin'),
	bodyParser = require('body-parser'),
	app = express(),
	db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true});

app.use(bodyParser());

app.param('collectionName', function (req, res, next, collectionName) {
	req.collection = db.collection(collectionName);
	return next();
});

app.get('/', function (req, res) {
	res.send('please pass a collection or entity, e.g. /:collectionName/:id')
});

app.get('/:collectionName', function(req, res, next) {
	req.collection.find({}, {limit:10, sort: [['_id', -1]]}).toArray(function (err, results) {
		if (err) {
			return next(err);
		}
		res.send(results);
	});
});

app.post('/:collectionName', function (req, res, next) {
	req.collection.insert(req.body, {}, function (err, results) {
		if (err) {
			return next(err);
		}
		res.send(results);
	});
});

app.get('/:collectionName/:id', function (req, res, next) {
	req.collection.findById(req.params.id, function (err, result) {
		if (err) {
			return next(err);
		}
		res.send(result);
	});
});

app.put('/:collectionName/:id', function (req, res, next) {
	req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false},
	function (err, result) {
		if (err) {
			return next(err);
		}
		res.send((result === 1) ? {msg:'success'}: {msg: 'error'})
	});
});

app.delete('/:collectionName/:id', function (req, res, next) {
	req.collection.removeById(req.params.id, function (err, result) {
		if (err) {
			return next(err);
		}
		res.send((result === 1) ? {msg: 'success'} : {msg: 'error'});
	});
});

app.listen(3000);