var superagent = require('superagent'),
		expect = require('expect.js');

describe('/api/articles CRUD tests:', function () {
	var id,
			testArticle = {
					topic: 'testSample',
					title: 'testTitle',
					location: 'testLocation',
					//publishDate: 
					//createdAt:
					text: 'testText',
					actions: 'testActions',
					tags: ['test0', 'test1', 'test2'] 
			};

	it('should POST an article, return success', function (done) {
		superagent
			.post('http://localhost:3000/api/articles')
			.send(testArticle)
			.end(function (res) {
				expect(res.body.message).to.contain('success');
				id = res.body.newArticleId;
				done();
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
			// figure out a good way to do dates
			// Uncaught Error: expected '2015-03-06T22:06:11.224Z' to sort of equal Fri, 06 Mar 2015 22:06:11 GMT
			// expect(res.body.updatedUser.createdAt).to.eql(testUser.createdAt);
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