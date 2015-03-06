var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('../models/user');
  
var userController = function (apiRouter) {
  apiRouter.route('/users')

    .post(function (req, res) {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.emailAddress = req.body.emailAddress;
      user.articleCount = req.body.articleCount;
      user.articles = req.body.articles;
      user.createdAt = req.body.createdAt;
      user.updatedAt = req.body.updatedAt;

      user.save(function (err) {
        if (err) {
          console.log('error: ' + err.message);
          return res.send(err);
        }
        res.json({
          message: 'success. user created!',
          newUserId: user._id
        });
      });
    })

    .get(function (req, res) {
      console.log('getting a user');
      User.find(function (err, users) {
        if (err) {
          return res.send(err);
        }
        res.json(users);
      });
    });

    apiRouter.route('/users/:userId')

      .get(function (req, res) {
        User.findById(req.params.userId, function (err, user) {
          if (err) {
            res.send(err);
          }
          console.log(user);
          res.json(user);
        });
      })

      .put(function (req, res) {
        User.findById(req.params.userId, function (err, user) {
          if (err) {
            res.send(err);
          }
          // propbably better to cache req.body for depth property search
          if (req.body.username) {
            user.username = req.body.username;
          }
          if (req.body.password) {
            user.password = req.body.password;
          }
          if (req.body.emailAddress) {
            user.emailAddress = req.body.emailAddress;
          }
          if (req.body.articleCount) {
            user.articleCount = req.body.articleCount;
          }
          if (req.body.articles) {
            user.articles = req.body.articles;
          }
          if (req.body.createdAt) {
            user.createdAt = req.body.createdAt;
          }
          if (req.body.updatedAt) {
            user.updatedAt = req.body.updatedAt;
          }

          user.save(function (err) {
            if (err) {
              res.send(err);
            }
            res.json({ message: 'User Updated!' });
          });
        });
      })

      .delete(function (req, res) {
        User.remove({
          _id: req.params.userId
        },function (err, user) {
            if (err) {
              return res.send(err);
            }
            res.json({ message: 'Successfully deleted user'});
        });
      });    
};

module.exports = userController;