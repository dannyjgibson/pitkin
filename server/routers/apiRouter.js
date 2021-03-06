var express = require('express'),
    apiRouter = express.Router();
// need to set up a little middlware on the router before passing 

apiRouter.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({"message" : "must be authenticated to hit this endpoint"});
};

apiRouter.use(function (req, res, next) {
  console.log('someone hit our api!');
  next();
});

apiRouter.get('/', function (req, res) {
  // list verbs and routes on html page to serve
  res.status(200).render('api', {title: 'Pitkin API'});
});
   
// hard coding in controllers
var UserController = require('../controllers/user-controller.js'),
    ArticleController = require('../controllers/article-controller.js'),
    MessageController = require('../controllers/message-controller.js');

var articleController = new ArticleController(apiRouter),
    userController = new UserController(apiRouter),
    messageController = new MessageController(apiRouter);
module.exports = apiRouter;   