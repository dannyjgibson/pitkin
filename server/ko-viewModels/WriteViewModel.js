// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

// not every attribute on the model gets added to the Article View Model
function WriteViewModel (model) {
  var self = this;
  self.articleId = ko.observable();
  self.userId = ko.observable();
  self.topic = ko.observable();
  self.title = ko.observable();
  self.text = ko.observable();
  self.tags = ko.observableArray();
  self.authorName = ko.observable();
  self.files = ko.observableArray();
  self.articleIdSet = ko.observable(); // maybe it should just check titles?

  self.getUserInformation = function (userId) {
    var userInfoUrl = configDatabaseTest + 'api/users/' + userId;
    console.log('get to:  ' + userInfoUrl);
    $.getJSON(userInfoUrl, function (data) {
      self.userId(userId);
      self.authorName(data.username);
      self.files(data.Articles);
      var articleIdsFromData = {};
      for (var file in self.files()) {
        articleIdsFromData[file.id] = true;
      }
      self.articleIdSet(articleIdsFromData);
    });
  };

  // wrapper method to check if an article already exists
  self.saveArticleData = function (data, event) {
    var articleData = {
      articleId: self.articleId(),
      title: self.title(),
      topic: self.topic(),
      text: self.text()
    };
    console.log('saving article');
    console.log(articleData);
    if (articleData.articleId in self.articleIdSet()) {
      self.putArticleInformation();
    } else {
      self.postArticleInformation(articleData);
    }
  };

  // saving a new article
  self.postArticleInformation = function (articleInfo) {
    var articlePOSTUrl = configDatabaseTest + 'api/articles/';
    $.post(articlePOSTUrl, articleInfo, function (res) {
      if (res.message.indexOf('success') === -1) {
        console.log('failed to post ' + articleInfo.id);
      } else {
        console.log('post of: ' + articleInfo.id + ' is a success');
      }
    });
  };

  // saving an article that already exists
  self.putArticleInformation = function (articleInfo) {
    var articlePUTUrl = configDatabaseTest + 'api/articles/' + articleInfo.id;
    $.ajax({
      type: 'PUT',
      url: articlePUTUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleInfo)
    }).done(function () {
      console.log('successful PUT to ' + articlePUTUrl);
    }).fail(function () {
      console.log('failed to PUT to ' + articlePUTUrl);
    });
  };

  self.getArticleInformation = function (articleId) {
    var articleInfoUrl = configDatabaseTest + 'api/articles/' + articleId;
    $.getJSON(articleInfoUrl, function (data) {
      self.articleId(data.id);
      self.topic(data.topic);
      self.title(data.title);
      self.text(data.text);
      self.tags(data.tags);
    });
  };

  self.loadArticleData = function (data, event) {
    self.getArticleInformation(data);
  };

  self.addTags = function (data, event) {
    var keyCode = (event.which ? event.which : event.keycode);
    if (keyCode === 13) {
      var toAdd = data.split(/,?\s+/);
      ko.tags(Array.prototype.push.apply(self.tags(), toAdd));        
    }
    return true;
  };

  var userIdFromDOM = $('.hidden-user-id').text();
  self.getUserInformation(userIdFromDOM);
}

ko.applyBindings(new WriteViewModel());