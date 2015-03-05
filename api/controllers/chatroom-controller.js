var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Chatroom = require('../models/chatroom');

  module.exports = (function (apiRouter) {
    apiRouter.route('chatrooms')
      .post(function (req, res) {
        var chatroom = new Chatroom();

        chatroom.text = req.body.text;
        chatroom.user = req.body.users;

        chatroom.save(function (err) {
          if (err) {
            console.log('error: ' + err.message);
            return res.send(err);
          }
          res.json({
            message: 'Chatroom data created!'
          });
        });
      })

      .get(function (req, res) {
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
        });
      });
  })();