var superagent = require('superagent'),
	expect = require('expect.js');

describe('express rest api server', function () {
	var id;

	it('post article', function (done) {
		superagent.post('http://localhost:27017/articles')
			.send({
				topic: 'testing',
				title: 'how to test',
				publishDate: Date.now(),
				updated: Date.now(),
				text: 'this is how you test'	
			})
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.eql(1);
				expect(res.body[0]._id.length).to.eql(24);
				id = res.body[0]._id;
				done();
			})
	});

	it('retrieves an article', function (done) {
		superagent.get('http://localhost:27017/articles/' + id)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body._id).to.eql(id);
				done();
			});
	});

	it('retrieves a collection of articles', function (done) {
		superagent.get('http://localhost:27017/articles')
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body.map(function (item) {
					return item._id;
				})).to.contain(id);
				done();
			});
	});

	it('updates an article', function (done) {
		superagent.put('http://localhost:27017/articles/' + id)
			.send({
				topic: 'still-testing',
				title: 'how to test an update',
				publishDate: Date.now(),
				updated: Date.now(),
				text: 'this is how you test an update'
			})
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg).to.eql('success');
				done();
			});
	});

	it('checks updated article', function (done) {
		superagent.get('http://localhost:27017/articles/' + id)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body._id).to.eql(id);
				expect(res.body.topic).to.eql('still-testing');
				done();
			});
	});

	it('removes an article', function (done) {
		superagent.del('http://localhost:27017/articles' + id)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg).to.eql('success');
				done();
			});
		});
	});
