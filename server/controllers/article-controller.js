var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    Article = require('../models/article');

var articleController = function(apiRouter) {
    apiRouter.route('/articles')
        .post(
            apiRouter.isAuthenticated,
            function(req, res) {
                var article = new Article();

                article.topic = req.body.topic;
                article.title = req.body.title;
                article.author = req.body.author;
                article.location = req.body.location;
                article.publishDate = req.body.publishDate;
                article.createdAt = req.body.createdAt;
                article.text = req.body.text;
                article.actions = req.body.actions;
                article.tags = req.body.tags;

                // maybe handle errs with promises?
                article.save(function(err) {
                    if (err) {
                        console.log('error: ' + err.message);
                        return res.send(err);
                    }
                    res.status(201).json({
                        message: 'success, article created!',
                        newArticleId: article._id
                    });
                });

            })

    .put(
        apiRouter.isAuthenticated,
        function(req, res) {
            Article.find({
                title: req.body.title
            }, function(err, article) {
                if (err) {
                    res.send(err);
                }
                article = article[0];
                var updatedArticle = {};
                // propbably better to cache req.body for depth property search

                updatedArticle.topic = req.body.topic || article.topic || '';

                updatedArticle.title = req.body.title || article.title || '';

                updatedArticle.author = req.body.author || article.author || '';

                updatedArticle.location = req.body.location || article.location || '';

                updatedArticle.publishDate = req.body.publishDate || article.publishDate || '';

                updatedArticle.createdAt = req.body.createdAt || article.createdAt || '';

                updatedArticle.updatedAt = req.body.updatedAt || article.updatedAt || '';

                updatedArticle.text = req.body.text || article.text || '';

                updatedArticle.tags = req.body.tags || article.tags || '';

                updatedArticle.offensiveToSomeone = false;

                Article.update({
                    title: article.title
                }, updatedArticle, {
                    upsert: true
                }, function(err, updatedArticleCount) {
                    if (err) {
                        res.json({
                            message: err.message
                        });
                    } else {
                        res.status(200).json({
                            message: 'articles successfuly updated',
                            updatedArticle: updatedArticle
                        });
                    }
                });
            });
        })

    .get(
        function(req, res) {
            Article.find(function(err, articles) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json(articles);
            });
        });

    apiRouter.route('/articles/:articleId')

    .get(function(req, res) {
        Article.findById(req.params.articleId, function(err, article) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(article);
            }
        });
    })

    .put(
        apiRouter.isAuthenticated,
        function(req, res) {
            Article.findById(
                req.params.articleId,
                function(err, article) {
                    if (err) {
                        res.send(err);
                    }
                    console.log(article);
                    // propbably better to cache req.body for depth property search
                    if (req.body.topic) {
                        article.topic = req.body.topic;
                    }
                    if (req.body.title) {
                        article.title = req.body.title;
                    }
                    if (req.body.author) {
                        article.author = req.body.author;
                    }
                    if (req.body.location) {
                        article.location = req.body.location;
                    }
                    if (req.body.publishDate) {
                        article.publishDate = req.body.publishDate;
                    }
                    if (req.body.createdAt) {
                        article.createdAt = req.body.createdAt;
                    }
                    if (req.body.updatedAt) {
                        article.updatedAt = req.body.updatedAt;
                    }
                    if (req.body.text) {
                        article.text = req.body.text;
                    }
                    if (req.body.actions) {
                        article.actions = req.body.actions;
                    }
                    if (req.body.tags) {
                        article.tags = req.body.tags;
                    }
                    if (req.body.offensiveToSomeone) {
                        article.offensiveToSomeone = req.body.offensiveToSomeone;
                    }

                    article.save(function(err) {
                        if (err) {
                            res.send(err);
                        }
                        res.json({
                            message: 'success. article updated.',
                            updatedArticle: article
                        });
                    });
                });
        })

    .delete(
        apiRouter.isAuthenticated,
        function(req, res) {
            Article.remove({
                _id: req.params.articleId
            }, function(err, article) {
                if (err) {
                    return res.send(err);
                }
                res.status(204).json({
                    message: 'success, deleted article'
                });
            });
        });
};

module.exports = articleController;
