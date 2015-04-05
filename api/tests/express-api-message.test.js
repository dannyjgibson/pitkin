var superagent = require('superagent'),
    expect = require('expect.js'),
    mongoose = require('mongoose'),
    config = require('../config'),
    dbName =  config.database.test,
    Message = require('../models/message'),
    User = require('../models/user');

var db = mongoose.createConnection(dbName);
    messageCollection = db.collection('messages');
    userCollection = db.collection('users');



describe('/api/messages CRUD tests:', function () {
  
  after( function () {
    messageCollection.remove( { '_id' : id}, function (res, err) {
      if (err) {
        console.log(err);        
      }
    });
    userCollection.remove( {'_id': postedUserId}, function (res, err) {
      if (err) {
        console.log(err);
      }
    });
  });

  var testFromUser = {
    username: 'testMessageUser',
    password: 'testMessagePass'
  },
    postedUserId,
    id,
    testMessage = {
      text: 'testText',
      timestamp: new Date()
    };

  it('should POST an message, return success', function (done) {

  superagent
    .post('http://localhost:3000/api/users')
    .send(testFromUser)
    .end(function (res) {
      postedUserId = res.body.newUserId;
      testMessage.from = postedUserId;
        superagent
          .post('http://localhost:3000/api/messages')
          .send(testMessage)
          .end(function (res) {
            expect(res.body.message).to.contain('success');
            id = res.body.newMessageId;
            done();
          });
      });
    });

  it('should GET a collection of messages', function (done) {
    superagent
      .get('http://localhost:3000/api/messages')
      .end(function (res) {
        expect(res.body.length).to.greaterThan(0); 
        done();
      });
  });

  it('should GET a specific message', function (done) {
    superagent
      .get('http://localhost:3000/api/messages/' + id)
      .end(function (res) {
        expect(res.body.text).to.equal('testText');
        done();
      });
  });

  it('should PUT update to a specific message', function (done) {
    testMessage.text = 'updatedText';
    superagent
    .put('http://localhost:3000/api/messages/' + id)
    .send({
      text: 'updatedText'
    })
    .end(function (res) {
      expect(res.body.updatedMessage.text).to.eql(testMessage.text);
      expect(res.body.updatedMessage.timestamp).to.eql(testMessage.timestamp.toISOString());
      done();
    });
  });

  it('should DELETE a specific message', function (done) {
    superagent
      .del('http://localhost:3000/api/messages/' + id)
      .end(function (res) {
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.contain('success');
        done();
      });
  });
});