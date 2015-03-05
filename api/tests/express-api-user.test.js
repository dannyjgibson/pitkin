var superagent = require('superagent'),
	expect = require('expect.js');

describe('express rest api server user', function () {
	var id;

	it('post user', function (done) {
		superagent.post('http://localhost:3000/api/users/')
			.send({
				userName: 'danny',
				password: 'bad-password',
				articleCount: 42,
				articles: null
			})
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.eql(1);
				expect(res.body[0]._id.length).to.eql(24);
				id = res.body[0]._id;
				done();
			});
	});

	it('retrieves a user', function (done) {
		superagent.get('http://localhost:3000/api/users/' + id)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body._id.to.eql(id));
				done();
			});
	});

	it('retrieves a collection of users', function (done) {
		superagent.get('http://localhost:3000/api/users/')
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body.map(function (item) {
					return item._id;
				})).to.contain(id);
				done();
			});
	});

	it('updates a user', function (done) {
		superagent.put('http://localhost:3000/api/users/' + id)
			.send({
				userName: 'updated-danny',
				password: 'update-bad-password',
				articleCount: 101
			})
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg).to.eql('success');
				done();
			});
	});

	it('checks updated user', function (done) {
		superagent.get('http://localhost:3000/api/users/' + id)
		.end(function (err, res) {
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(res.body.msg).to.eql('success');
			done();
		});
	});

	it('removes a user', function (done) {
		superagent.del('http://localhost:3000/api/users/' + id)
			.end(function (err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg.to.eql('success'));
				done();
			});
	});
});