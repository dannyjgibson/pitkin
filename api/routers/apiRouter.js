var express = require('express');
   
module.exports = (function() {
  var apiRouter = express.Router();

  apiRouter.get('/', function (req, res) {
    // list verbs and routes here
    res.send('Welcome to the pitkin API. Please pass a route...');
  });

  apiRouter = require('../controllers/article-controller')(apiRouter);
  apiRouter = require('../controllers/chatroom-controller.js')(apiRouter);
  apiRouter = require('../controllers/user-controller.js')(apiRouter);
  return apiRouter;
})();
   