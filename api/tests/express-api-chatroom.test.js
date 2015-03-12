var superagent = require('superagent'),
    expect = require('expect.js'),
    mongoose = require('mongoose'),
    dbName = process.env.DATABASE_URL || 'mongodb://@localhost:27017/test';

mongoose.connect(dbName);
var db = mongoose.createConnection(dbName);
    collection = db.collection('users'); 

describe('/api/chatrooms CRUD tests:', function () {

  after( function () {
    collection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
    });
  });

  var id,
      testChatroom = {
          text: 'testText'
          // users:  
      };

  it('should POST a chatroom, return success', function (done) {
    superagent
      .post('http://localhost:3000/api/chatrooms')
      .send(testChatroom)
      .end(function (res) {
        expect(res.body.message).to.contain('success');
        id = res.body.newChatroomId;
        done();
      });
  });

  it('should GET a collection of chatrooms', function (done) {
    superagent
      .get('http://localhost:3000/api/chatrooms')
      .end(function (res) {
        expect(res.body.length).to.greaterThan(0); // make sure you run this test case after a POST
        done();
      });
  });

  it('should GET a specific chatroom', function (done) {
    superagent
      .get('http://localhost:3000/api/chatrooms/' + id)
      .end(function (res) {
        expect(res.body.text).to.equal('testText');
        done();
      });
  });

  it('should PUT update to a specific chatroom', function (done) {
    testChatroom.text = 'updatedText';
    superagent
    .put('http://localhost:3000/api/chatrooms/' + id)
    .send({
      text: 'updatedText'
    })
    .end(function (res) {
      expect(res.body.updatedChatroom.text).to.eql(testChatroom.text);
      // figure out a good way to do dates
      // Uncaught Error: expected '2015-03-06T22:06:11.224Z' to sort of equal Fri, 06 Mar 2015 22:06:11 GMT
      // expect(res.body.updatedUser.createdAt).to.eql(testUser.createdAt);
      done();
    });
  });

  it('should DELETE a specific article', function (done) {
    superagent
      .del('http://localhost:3000/api/chatrooms/' + id)
      .end(function (res) {
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.contain('success');
        done();
      });
  });
});