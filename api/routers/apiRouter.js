var express = require('express'),
    fs = require('fs');
   
module.exports = (function() {
  var apiRouter = express.Router();

  // need to set up a little middlware on the router before passing 
  apiRouter.use(function (argument) {
    console.log('someone hit our api!');

    next();
  });

  apiRouter.get('/', function (req, res) {
    // list verbs and routes on html page to serve
    res.send('Welcome to the pitkin API. Please pass a route...');
  });

  fs.readdirSync(__dirname + '/../controllers').forEach(function (file) {
    if (file.match('.js$')) {
      console.log('loading controller: ' + file);
      console.log('with a router:' + apiRouter);
      require(__dirname + '/../controllers/' + file);
    }
  });
})();
   