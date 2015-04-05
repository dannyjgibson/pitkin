var superagent = require('superagent'),
    expect = require('expect.js'),
    mongoose = require('mongoose'),
    config = require('../config'),
    dbName =  config.database.test;

mongoose.connect(dbName);
var db = mongoose.createConnection(dbName);
    chatroomCollection = db.collection('chatrooms');
    userCollection = db.collection('users');

describe('/api/chatrooms CRUD tests:', function () {

  after( function () {
    chatroomCollection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
    });
    userCollection.remove( { '_id' : postedUserId}, function (res, err) {
      if (err) {
        console.log(err);        
      }
    });
  });

  var testUser = {
    username: 'testChatroomUser',
    password: 'testChatroomPass'
    },
    postedUserId,
    id,
    testChatroom = {
        namespaceId: '0123456789abcedf',
        text: 'testText'  
    };

  it('should POST a chatroom, return success', function (done) {
    superagent
      .post('http://localhost:3000/api/users')
      .send(testUser)
      .end(function (res) {
        postedUserId = res.body.newUserId;
        testChatroom.users = [postedUserId];
      superagent
        .post('http://localhost:3000/api/chatrooms')
        .send(testChatroom)
        .end(function (res) {
          expect(res.body.message).to.contain('success');
          id = res.body.newChatroomId;
          done();
        });
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
        expect(res.body.namespaceId).to.equal('0123456789abcedf');
        done();
      });
  });

  it('should PUT update to a specific chatroom', function (done) {
    testChatroom.text = 'updatedText';
    superagent
    .put('http://localhost:3000/api/chatrooms/' + id)
    .send({
      text: 'updatedText',
      namespaceId: 'updatedchatroomid'
    })
    .end(function (res) {
      expect(res.body.updatedChatroom.text).to.eql(testChatroom.text);
      expect(res.body.updatedChatroom.namespaceId).to.eql(testChatroom.namespaceId);
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