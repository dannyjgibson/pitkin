var superagent = require('superagent'),
		expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = require('../models/user'),		
    config = require('../config'),
    dbName =  config.database.test;
    
var db = mongoose.createConnection(dbName);
		collection = db.collection('users');

describe('authentication testing', function() {
	after( function () {
		collection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
		});
	});

	it('should hash a password', function (done) {
		var testPassword = 'testPassword';
		var hashedPassword = User.hashPassword();
		expect(testPassword).to.not.equal(hashedPassword, null);
		done();
	});
});

describe('/api/users CRUD tests:', function () {
  
	after( function () {
		collection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
		});
	});

	var id,
			testUser = {
				username: 'testUser',
				password: 'testPass',
				emailAddress: 'test@test.com',
				articleCount: 42,
				createdAt: new Date()
			};

	it('should POST a user, return success', function (done) {
		superagent
			.post('http://localhost:3000/api/users')
			.send(testUser)
			.end(function (res) {
				expect(res.body.message).to.contain('success');
				id = res.body.newUserId;
				done();
			});
	});

	it('should GET a collection of users', function (done) {
		superagent
			.get('http://localhost:3000/api/users')
			.end(function (res) {
				expect(res.body.length).to.greaterThan(0); // make sure you run this test case after a POST
				done();
			});
	});

	it('should GET a specific user', function (done) {
		superagent
			.get('http://localhost:3000/api/users/' + id)
			.end(function (res) {
				expect(res.body.username).to.equal(testUser.username);
				expect(res.body.createdAt).to.equal(testUser.createdAt.toISOString());
				done();
			});
	});

	it('should PUT update to a specific user', function (done) {
		testUser.username = 'updatedUserName';
		testUser.password = 'updatedPassword';
		superagent
		.put('http://localhost:3000/api/users/' + id)
		.send({
			username: 'updatedUserName',
			password: 'updatedPassword'
		})
		.end(function (res) {
			expect(res.body.updatedUser.username).to.eql(testUser.username);
			expect(res.body.updatedUser.password).to.eql(testUser.password);
			expect(res.body.updatedUser.emailAddress).to.eql(testUser.emailAddress);
			expect(res.body.updatedUser.articleCount).to.eql(testUser.articleCount);
			done();
		});
	});

	it('should DELETE a specific user', function (done) {
		superagent
			.del('http://localhost:3000/api/users/' + id)
			.end(function (res) {
				expect(typeof res.body).to.eql('object');
				expect(res.body.message).to.contain('success');
				done();
			});
	});
});