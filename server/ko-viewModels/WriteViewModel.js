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
  self.userArticles = ko.observableArray();
  self.newFile = ko.observable(true);
  self.userArticleIdSet = ko.observable();
  self.userArticleTitleSet = ko.observable();
  self.allPublishedArticleIds = ko.observable();

  // method to get user info and the user's articles
  self.getUserInformation = function (userId) {
    var userInfoUrl = configDatabaseTest + 'api/users/' + userId;
    console.log('get to:  ' + userInfoUrl);
    $.getJSON(userInfoUrl, function (data) {
      self.userId(userId);
      self.authorName(data.username);
      var articlesFromGET = data.Articles || [];
      self.userArticles(articlesFromGET);
      var articleIdsFromData = {},
          articleTitlesFromData = {};
      for (var file in self.userArticles()) {
        articleIdsFromData[file.id] = true;
        articleTitlesFromData[file.title] = true;
      }
      self.userArticleIdSet(articleIdsFromData);
      self.userArticleTitleSet(articleTitlesFromData);
    });
  };

  // wrapper method to check if an article already exists
  self.saveArticleData = function (data, event) {
    console.log('save data');
    var articleData = {
      articleId: self.articleId(),
      title: self.title(),
      topic: self.topic(),
      text: self.text()
    };
    if (articleData.title in self.userArticleTitleSet()) {
      self.putExistingArticleInformationToUser(articleData);
    } else {
      self.putNewArticleInformationToUser(articleData);
    }
  };

  self.putNewArticleInformationToUser = function (articleInfo) {
    delete articleInfo.articleId;
    var userInfoUrl = configDatabaseTest + 'api/users/' + self.userId(),
        updatedArticles = self.userArticles();
    var toPOSTarticles = updatedArticles.push(articleInfo); // I don't know why, but articles don't work without another var...
    $.getJSON(userInfoUrl, function (data) {
        data.articles = updatedArticles;
        console.log('data, articles first: ');
        console.log(data.articles);
        console.log(data);
      $.ajax({
        type: 'PUT',
        url: userInfoUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
      }).done(function () {
        console.log('successful PUT to ' + userInfoUrl);
      }).fail(function () {
        console.log('failed to PUT to ' + userInfoUrl);
      });
    });
    
  };

  self.putExistingArticleInformationToUser = function (articleInfo) {
    var userInfoUrl = configDatabaseTest + 'api/users/' + self.userId();
    console.log(self.authorName + ' already has an article titled ' + articleInfo.title);
    $.ajax({
      type: 'PUT',
      url: userInfoUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleInfo)
    }).done(function () {
      console.log('successful PUT to ' + userInfoUrl);
    }).fail(function () {
      console.log('failed to PUT to ' + userInfoUrl);
    });
  };

  self.publishArticleData = function(data, event) {
    self.getAllPublishedArticles();
    var articleData = {
      articleId: self.articleId(),
      title: self.title(),
      topic: self.topic(),
      text: self.text()
    };
    if (self.allPublishedArticleIds()[articleData.articleId]) {
      self.putArticleInformationToPublished(articleData);
    } else {
      self.postArticleInformationToPublished(articleData);
    }
  };

  // publish a new article
  self.postArticleInformationToPublished = function (articleInfo) {
    var articlePOSTUrl = configDatabaseTest + 'api/articles/';
    $.post(articlePOSTUrl, articleInfo, function (res) {
      if (res.message.indexOf('success') === -1) {
        console.log('failed to post ' + articleInfo.id);
      } else {
        console.log('post of: ' + articleInfo.id + ' is a success');
      }
    });
  };

  // publishing an article that already exists
  self.putArticleInformationToPublished = function (articleInfo) {
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

  self.getAllPublishedArticles = function() {
    var articleInfoUrl = configDatabaseTest + 'api/articles/',
        articleIdsFromData = {};
    $.getJSON(articleInfoUrl, function (data) {
      for (var datum in data) {
        articleIdsFromData[datum.id] = true;
      }
      self.allPublishedArticleIds(articleIdsFromData);
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