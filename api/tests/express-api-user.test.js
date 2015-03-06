var superagent = require('superagent'),
		expect = require('expect.js');

describe('test api/users:', function () {
	var id;
	it('should POST a user, return success', function (done) {
		superagent
			.post('http://localhost:3000/api/users')
			.send({
				username: 'testUser',
				password: 'testPass',
				emailaddress: 'test@test.com',
				articleCount: 42,
				createdAt: new Date()
			})
			.end(function (res) {
				expect(res.body.message).to.contain('success');
				id = res.body.newUserId;
				done();
			});
	});

	it('should GET users, return users', function (done) {
		superagent
			.get('http://localhost:3000/api/users/' + id)
			.end(function(res) {
				expect(res.body.length).to.not.equal(null);
				done();
			});
	});

	it('should PUT update to a user', function (done) {

	});
});