var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Message = require('../models/message');

var messageController = function (apiRouter) {  
  apiRouter.route('/messages')
    .post(
      apiRouter.isAuthenticated,
      function (req, res) {
      var message = new Message();

      message.text = req.body.text;
      message.from = req.body.from;
      message.timestamp = req.body.timestamp;

      // maybe handle errs with promises?
      message.save(function (err) {
        if (err) {
          console.log('error: ' + err.message);
          return res.send(err);
        }
        res.json({
          message: 'success, message created!',
          newMessageId: message._id
        });
      });

    })

    .get(function (req, res) {
      Message.find(function (err, messages) {
        if (err) {
          return res.send(err);
        }
        res.json(messages);
      });
    });

  apiRouter.route('/messages/:messageId')

    .get(function (req, res) {
      Message.findById(req.params.messageId, function (err, message) {
        if (err) {
          res.send(err);
        }
        res.json(message);
      });
    })

    .put(
      apiRouter.isAuthenticated,
      function (req, res) {
      Message.findById(req.params.messageId, function (err, message) {
        if (err) {
          res.send(err);
        }
        // propbably better to cache req.body for depth property search
        var reqBody = req.body;
        if (reqBody.text) {
          message.text = reqBody.text;
        }
        if (reqBody.from) {
          message.from = reqBody.from;
        }
        if (reqBody.timestamp) {
          message.timestamp = reqBody.timestamp;
        }

        message.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ 
            message: 'success, message updated',
            updatedMessage: message
            });
        });
      });
    })  

    .delete(
      apiRouter.isAuthenticated,
      function (req, res) {
      Message.remove({
        _id: req.params.messageId 
      }, function (err, message) {
          if (err) {
            return res.send(err);
          }
          res.json({ message: 'success, deleted message' });
      });
    });
};

module.exports = messageController;