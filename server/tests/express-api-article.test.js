var superagent = require('superagent'),
		expect = require('expect.js'),
    mongoose = require('mongoose'),
    config = require('../config'),
    dbName =  config.database.test;

var db = mongoose.createConnection(dbName);
		articleCollection = db.collection('articles');
		userCollection = db.collection('users');

describe('/api/articles CRUD tests:', function () {
	
	after( function () {
		articleCollection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
		});
		userCollection.remove( {'_id' : postedUserId}, function (res, err) {
			if (err) {
				console.log(err);
			}
		});
	});

	var testAuthorUser = {
			username: 'testArticleUser',
			password: 'testArticlePass'
	},
			postedUserId,
			id,
			testArticle = {
					topic: 'testSample',
					title: 'testTitle',
					location: 'testLocation',
					publishDate: new Date(), 
					createdAt: new Date(),
					text: 'testText',
					actions: 'testActions',
					tags: ['test0', 'test1', 'test2'] 
			};

	it('should POST an article, return success', function (done) {
		superagent
		.post('http://localhost:3000/api/users')
		.send(testAuthorUser)
		.end(function (res) {
			postedUserId = res.body.newUserId;
			testArticle.author = postedUserId;
			superagent
				.post('http://localhost:3000/api/articles')
				.send(testArticle)
				.end(function (res) {
					expect(res.body.message).to.contain('success');
					id = res.body.newArticleId;
					done();
				});
		});
	});

	it('should GET a collection of articles', function (done) {
		superagent
			.get('http://localhost:3000/api/articles')
			.end(function (res) {
				expect(res.body.length).to.greaterThan(0); // make sure you run this test case after a POST
				done();
			});
	});

	it('should GET a specific article', function (done) {
		superagent
			.get('http://localhost:3000/api/articles/' + id)
			.end(function (res) {
				expect(res.body.title).to.equal('testTitle');
				done();
			});
	});

	it('should PUT update to a specific article', function (done) {
		testArticle.title = 'updatedTitle';
		testArticle.topic = 'updatedTopic';
		superagent
		.put('http://localhost:3000/api/articles/' + id)
		.send({
			title: 'updatedTitle',
			topic: 'updatedTopic'
		})
		.end(function (res) {
			expect(res.body.updatedArticle.topic).to.eql(testArticle.topic);
			expect(res.body.updatedArticle.title).to.eql(testArticle.title);
			expect(res.body.updatedArticle.location).to.eql(testArticle.location);
			expect(res.body.updatedArticle.text).to.eql(testArticle.text);
			expect(res.body.updatedArticle.actions).to.eql(testArticle.actions);
			expect(res.body.updatedArticle.tags).to.eql(testArticle.tags);
			expect(res.body.updatedArticle.createdAt).to.eql(testArticle.createdAt.toISOString());
			expect(res.body.updatedArticle.publishDate).to.eql(testArticle.publishDate.toISOString());
			done();
		});
	});

	it('should DELETE a specific article', function (done) {
		superagent
			.del('http://localhost:3000/api/articles/' + id)
			.end(function (res) {
				expect(typeof res.body).to.eql('object');
				expect(res.body.message).to.contain('success');
				done();
			});
	});
});