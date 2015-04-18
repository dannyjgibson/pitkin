// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

// not every attribute on the model gets added to the Article View Model
function WriteViewModel (model) {
  var self = this;
  self.topic = ko.observable();
  self.title = ko.observable();
  self.text = ko.observable();
  self.tags = ko.observableArray();
  self.authorName = ko.observable();
  self.files = ko.observableArray();

  self.getUserInformation = function (userId) {
    var userInfoUrl = configDatabaseTest + '/api/users/' + userId;
    $.getJSON(userInfoUrl, function (data) {
      self.authorName(userInfo.username);
      self.files(userInfo.Articles);
    });
  };

  self.postWriteInformation = function (updated) {

  };

  self.getArticleInformation = function (articleId) {
    var articleInfoUrl = configDatabaseTest + '/api/articles/' + articleId;
    $.getJSON(articleInfoUrl, function (data) {
      self.topic(data.topic);
      self.title(data.title);
      self.text(data.text);
      self.tags(data.tags);
    });
  };

  self.addTags = function (data, event) {
    var keyCode = (event.which ? event.which : event.keycode);
    if (keyCode === 13) {
      var toAdd = data.split(/,?\s+/);
      ko.tags(Array.prototype.push.apply(self.tags(), toAdd));        
    }
    return true;
  };

  self.getUserInformation(self.authorName());
}

ko.applyBindings(new WriteViewModel());