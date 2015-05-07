var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    User = require('../models/user'),
    Article = require('../models/article');

var userController = function(apiRouter) {
    apiRouter.route('/users')

    .post(
        function(req, res) {
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

            user.save(function(err) {
                if (err) {
                    console.log('error: ' + err.message);
                    return res.send(err);
                }
                res.status(201).json({
                    message: 'success. user created!',
                    newUserId: user._id
                });
            });
        })

    .get(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {
                User.find(function(err, users) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json(users);
                });
            } else {
                res.status(403).json({
                    message: 'You can only GET user info that belongs to you.'
                });
            }
        }
    );

    apiRouter.route('/users/:userId')

    .get(
      apiRouter.isAuthenticated,
      function(req, res) {
        if (req.user.id == req.params.userId) {
            User.findById(req.params.userId, function(err, user) {
                if (err) {
                    res.send(err);
                }
                res.status(200).json(user);
            });
        } else {
            res.status(403).json({
                message: 'You can only GET user info that belongs to you'
            });
        }
    })

    .put(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {

                User.findById(req.params.userId, function(err, user) {
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

                    user.save(function(err) {
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
                res.status(403).json({
                    message: 'You can only PUT user info that belongs to you'
                });
            }
        }
    )

    .delete(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {
                User.remove({
                        _id: req.params.userId
                    },
                    function(err, user) {
                        if (err) {
                            return res.send(err);
                        }
                        res.status(204).json({
                            message: 'success, user deleted!'
                        });
                    });
            } else {
                res.status(403).json({
                    message: 'You can only DELETE user info that belongs to you.'
                });
            }
        });
    apiRouter.route('/users/:userId/articles')

        .get(
            apiRouter.isAuthenticated,
            function(req, res) {
                if (req.user.id === req.params.userId) {
                    User.findById(req.params.userId, function(err, user) {
                        if (err) {
                            res.send(err);
                        }
                        res.status(200).json(user.articles);
                    });
                } else {
                    res.status(403).json({
                        message: 'you can only GET articles that belong to you'
                    });
                }
            }
        )

    .post(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {
                var article = new Article();
                if (req.body.text) {
                  article.text = validator.trim(req.body.text);
                }
                if (req.body.topic) {
                  article.topic = validator.trim(req.body.topic);
                }
                if (req.body.title) {
                  article.title = validator.trim(req.body.title);
                }
                if (req.body.tags) {
                  article.tags = validator.trim(req.body.tags);
                }

                User.findById(req.params.userId, function(err, user) {
                    if (err) {
                        res.send(err);
                    }

                    user.articles.push(article);

                    user.save(function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).json({
                                message: 'success, user articles updated',
                                updatedUserArticles: user.articles
                            });
                        }
                    });
                });
            } else {
                res.status(403).json({
                    message: 'you can only POST articles that belong to you'
                });
            }
        }
    )

    .put(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {
                User.findById(req.params.userId, function(err, user) {
                    if (err) {
                        res.send(err);
                    }

                    var userArticles = user.articles,
                        articleIndex;                    
                    for (articleIndex = 0; articleIndex < userArticles.length; articleIndex++) {
                      if (userArticles[articleIndex].title === req.body.title) {
                        break;
                      }
                    }

                    var article = user.articles[articleIndex];
                    if (req.body.title) {
                      article.title = req.body.title;
                    }
                    if (req.body.topic) {
                      article.topic = req.body.topic;
                    }
                    if (req.body.text) {
                      article.text = req.body.text;
                    }
                    if (req.body.tags) {
                      article.tags = req.body.tags;
                    }
                    user.articles[articleIndex] = article;
                  User.update({_id: user._id}, {articles: user.articles}, {upsert: true}, function (err, updatedUser) {
                    if (err) {
                      res.json({message: err.message});
                    } else {
                      res.status(200).json({
                        message: 'user articles successfully updated',
                        updatedArticles: user.articles
                      });
                    }
                  });
                });
            } else {
                res.status(403).json({
                    message: 'you can only PUT articles that belong to you'
                });
            }
        }
    )

    .delete(
        apiRouter.isAuthenticated,
        function(req, res) {
            if (req.user.id === req.params.userId) {
                User.findById(req.params.user, function(err, user) {
                    if (err) {
                        res.send(err);
                    }
                    var articleIndex = user.articles.indexOf(req.body);
                    user.articles[articleIndex] = user.articles.splice(articleIndex, 1);

                    user.save(function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).json({
                                message: 'success, user article deleted',
                                updatedUserArticles: user.articles
                            });
                        }
                    });
                });
            } else {
                res.status(403).json({
                    message: 'you can only DELETE articles that belong to you'
                });
            }
        }
    );
};

module.exports = userController;
