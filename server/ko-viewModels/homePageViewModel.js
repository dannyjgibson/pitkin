// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

function HomePageViewModel (model) {
  var self = this;
  self.articles = ko.observableArray();

self.getArticles = function () {
  var articleUrl = configDatabaseTest + 'api/articles/';
  $.getJSON(articleUrl, function (articles) {
    self.articles(articles);
  });
};

self.getArticles();
}

ko.applyBindings(new HomePageViewModel());