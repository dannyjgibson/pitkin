var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    User = require('../models/user');


var userController = function (apiRouter) {
    apiRouter.route('/users')

    .post(
        apiRouter.isAuthenticated,
        function (req, res) {
          if (apiRouter.userInASession === req.params.userId) {
            var user = new User();
            user.username = validator.trim(req.body.username);
            user.password = validator.trim(req.body.password);
            if (validator.isEmail(user.emailAddress)) {
                user.emailAddress = validator.normalizeEqual(validator.trim(req.body.emailAddress));
            }
            user.articleCount = req.body.articleCount;
            user.articles = req.body.articles;
            user.createdAt = req.body.createdAt;
            user.updatedAt = req.body.updatedAt;

            user.save(function (err) {
                if (err) {
                    console.log('error: ' + err.message);
                    return res.send(err);
                }
                res.status(201).json({
                    message: 'success. user created!',
                    newUserId: user._id
                });
            });
          }
        })

    .get(
        apiRouter.isAuthenticated,
        function (req, res) {
            if (apiRouter.userInASession === req.params.userId) {
                User.find(function(err, users) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json(users);
                });
            } else {
                console.log("You can only GET user info that belongs to you.");
            }
        }
    );

    apiRouter.route('/users/:userId')

    .get(function (req, res) {
        if (apiRouter.userInASession == req.params.userId) {
            User.findById(req.params.userId, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.status(200).json(user);
            });
        } else {
            console.log("You can only GET user info that belongs to you");
        }
    })

    .put(
        apiRouter.isAuthenticated,
        function (req, res) {
            if (apiRouter.userInASession === req.params.userId) {

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
                            console.log('err: ' + err.message);
                            res.send(err);
                        } else {
                            res.status(200).json({
                                message: 'success, user updated!',
                                updatedUser: user
                            });
                        }
                    });
                });
            } else {
                console.log("You can only PUT user info that belongs to you");
            }
        }
    )

    .delete(
        apiRouter.isAuthenticated,
        function (req, res) {
            if (apiRouter.userInASession === req.params.userId) {
                User.remove({
                        _id: req.params.userId
                    },
                    function (err, user) {
                        if (err) {
                            return res.send(err);
                        }
                        res.status(204).json({
                            message: 'success, user deleted!'
                        });
                    });
            } else {
                console.log("You can only DELETE user info that belongs to you.");
            }
        });
};

module.exports = userController;
