var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	Article = require('./models/article'),
	port = process.env.PORT || 3000;

	app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


// Setting up CORS requests.
// Think about which Access-Control-Methods to allow
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Other REST mehtods?
	res.setHeader('Access-Control-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

//logging to console
app.use(morgan('dev'));

// connecting to db with mongoose, gonna need it for validation
mongoose.connect('mongodb://@localhost:27017/test');
console.log('connected to mongodb at localhost:27017/test' );

app.param('collectionName', function (req, res, next, collectionName) {
	req.collection = db.collection(collectionName);
	return next();
});

//routing
app.get('/', function (req, res) {
	res.send('Welcome to the homepage');
});

var apiRouter = express.Router();

apiRouter.get('/', function(req, res){
	// will want to serve back static API info page here
	res.send('Welcome to pitkin API. Please pass a route...' );
});

apiRouter.route('articles')

	.post(function(req, res) {
		var article = new Article();

		article.topic = req.body.topic;
		article.title = req.body.title;
		article.location = req.body.location;
		article.publishDate = req.body.publishDate;
		article.createdAt = req.body.createdAt;
		article.text = req.body.text;
		article.actions = req.body.text;
		article.tags = req.body.tags;

		// maybe handle errs with promises?
		article.save(function(err) {
			if (err) {
				console.log('error: ' + err.message);
				return res.send(err);
			}
			res.json({
				message: 'Article created!'
			});
		});

	})

	.get(function(req, res) {
		Article.find(function(err, articles) {
			if (err) {
				return res.send(err);
			}
			res.json(articles);
		});
	});

apiRouter.route('/articles/:articleId')
	.get(function(req, res) {
		Article.findById(req.params.articleId, function(err, article) {
			if (err) {
				res.send(err);
			}
			res.json(article);
		});
	})

	.put(function(req, res) {
		Article.findById(req.params.articleId, function(err, article){
			if (err) {
				res.send(err);
			}
			// propbably better to cache req.body for depth property search
			if (req.body.topic) {
				article.topic = req.body.topic;
			}
			if (req.body.title) {
				article.title = req.body.title;
			}
			if (req.body.location) {
				article.location = req.body.location;
			}
			if (req.body.publishDate) {
				article.publishDate = req.body.publishDate;
			}
			if (req.body.createdAt) {
				article.createdAt = req.body.createdAt;
			}
			if (req.body.updatedAt) {
				article.updatedAt = req.body.updatedAt;
			}
			if (req.body.text) {
				article.text = req.body.text;
			}
			if (req.body.actions) {
				article.actions = req.body.actions;
			}
			if (req.body.tags) {
				article.tags = req.body.tags;
			}

			article.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Article updated'});
			});
		});

	})

	.delete(function(req, res) {
		Article.remove({
			_id: req.params.articleId
		}, function(err, article) {
			if (err) {
				return res.send(err);
			}
			res.json({ message: 'Successfully deleted article'});
		});
	});

//register routes

app.use('/api', apiRouter);
app.listen(port);
console.log('listening on port ' + port);