var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Chatroom = require('../models/chatroom');

var chatroomController = function (apiRouter) {
  apiRouter.route('/chatrooms')
    .post(function (req, res) {
      var chatroom = new Chatroom();

      chatroom.text = req.body.text;
      chatroom.user = req.body.users;
      chatroom.namespaceId = req.body.namespaceId;
      
      chatroom.save(function (err) {
        if (err) {
          console.log('error: ' + err.message);
          return res.send(err);
        }
        res.json({
          message: 'success, chatroom data created!',
          newChatroomId: chatroom._id
        });
      });
    })

    .get(function (req, res) {
      console.log('get chatroom');
      Chatroom.find(function (err, chatrooms) {
        if (err) {
          return res.send(err);
        }
        res.json(chatrooms);
      });
    });

  apiRouter.route('/chatrooms/:chatroomId')
    .get(function (req, res) {
      Chatroom.findById(req.params.chatroomId, function (err, chatroom) {
        if (err) {
          res.send(err);
        }
        res.json(chatroom);
      });
    })

    .put(function (req, res) {
      Chatroom.findById(req.params.chatroomId, function (err, chatroom) {
        if (err) {
          res.send(err);
        }
        if (req.body.text) {
          chatroom.text = req.body.text;
        }
        if (req.body.users) {
          chatroom.users = req.body.users;
        }

        chatroom.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ 
            message: 'success, chatroom updated!',
            updatedChatroom: chatroom
          });
        });
      });
    })

    .delete(function (req, res) {
      Chatroom.remove({
        _id: req.params.chatroomId
      }, function (err, chatroom) {
        if (err) {
          return res.send(err);
        }
        res.json({ message : 'success, chatroom deleted.'});
      });
    });   
}; 

module.exports = chatroomController;