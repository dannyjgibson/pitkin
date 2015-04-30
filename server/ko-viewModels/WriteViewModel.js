// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

// not every attribute on the model gets added to the Article View Model
var WriteViewModel = function (model) {
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
  self.userArticleTitleSet = ko.observable();
  self.allPublishedArticleIds = ko.observable();

  // method to get user info and the user's articles
  self.getUserInformation = function (userId) {
    var userInfoUrl = configDatabaseTest + 
                      'api/users/' +
                      userId +
                      '/articles';
    $.getJSON(userInfoUrl, function (data) {
      var articlesFromGET = data || [];
      self.userArticles(articlesFromGET);
      var articleTitlesFromData = {};
      for (var file in articlesFromGET) {
        var article = articlesFromGET[file];
        articleTitlesFromData[article.title] = true;
      }
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
    if (self.userArticleTitleSet()[articleData.title]) {
      self.putExistingArticleDataToUser(articleData);
    } else {
      self.putNewArticleDataToUser(articleData);
    }
  };

  self.putNewArticleDataToUser = function (articleData) {
    delete articleData.articleId;
    var userInfoUrl = configDatabaseTest +
                     'api/users/' +
                      self.userId() +
                      '/articles',
        updatedArticles = self.userArticles();
    $.ajax({
      type: 'POST',
      url: userInfoUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleData)
    }).done(function () {
      console.log('successful POST to ' + userInfoUrl);
      self.userArticles(data.articles);
    }).fail(function () {
      console.log('failed to POST to ' + userInfoUrl);
    });
  };

  self.putExistingArticleDataToUser = function (articleData) {
    console.log(self.authorName() +
                ' already has an article titled ' +
                articleData.title);
    
    var userInfoUrl = configDatabaseTest + 'api/users/' + self.userId(),
        updatedArticles = self.userArticles(),
        updatedUser = {};

    for (var i = 0; i < updatedArticles.length; i++) {
      if (updatedArticles[i].title === articleData.title) {
        break;
      }
    }

    updatedArticles[i] = articleData;
    $.getJSON(userInfoUrl, function (data) {
        data.articles = updatedArticles;
        updatedUser = data;
      $.ajax({
        type: 'PUT',
        url: userInfoUrl,
        contentType: 'application/json',
        data: JSON.stringify(updatedUser)
      }).done(function () {
        console.log('successful PUT to ' + userInfoUrl);
        self.userArticles(updatedUser);
      }).fail(function () {
        console.log('failed to PUT to ' + userInfoUrl);
      });
    }); 
    
  };

  self.publishArticleData = function (data, event) {
    self.getAllPublishedArticles();
    var articleData = {
      articleId: self.articleId(),
      title: self.title(),
      topic: self.topic(),
      text: self.text()
    };
    if (self.allPublishedArticleIds()[articleData.articleId]) {
      self.putArticleDataToPublished(articleData);
    } else {
      self.postArticleDataToPublished(articleData);
    }
  };

  // publish a new article
  self.postArticleDataToPublished = function (articleData) {
    var articlePOSTUrl = configDatabaseTest + 'api/articles/';
    $.post(articlePOSTUrl, articleData, function (res) {
      if (res.message.indexOf('success') === -1) {
        console.log('failed to post ' + articleData.id);
      } else {
        console.log('post of: ' + articleData.id + ' is a success');
      }
    });
  };

  // publishing an article that already exists
  self.putArticleDataToPublished = function (articleData) {
    var articlePUTUrl = configDatabaseTest + 'api/articles/' + articleData.id;
    $.ajax({
      type: 'PUT',
      url: articlePUTUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleData)
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

  self.getAllPublishedArticles = function () {
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
  self.userId(userIdFromDOM);
  self.getUserInformation(userIdFromDOM);
};

ko.applyBindings(new WriteViewModel());