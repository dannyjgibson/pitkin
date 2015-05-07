// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/',
    configDatabaseTor = 'http://drrnw33iylgclylb.onion/';

// not every attribute on the model gets added to the Article View Model
var WriteViewModel = function (model) {
  var self = this;
  self.articleId = ko.observable();
  self.userId = ko.observable();
  self.topic = ko.observable();
  self.title = ko.observable();
  self.text = ko.observable();
  self.tags = ko.observableArray();
  self.userArticles = ko.observableArray();
  self.newFile = ko.observable(true);
  self.userArticleTitleSet = ko.observable();
  self.allPublishedArticleTitlesSet = ko.observable();

  // method to get user info and the user's articles
  self.getUserInformation = function (userId) {
    var userInfoUrl = configDatabaseTest +
                      'api/users/' +
                      userId +
                      '/articles';
    $.getJSON(userInfoUrl, function (data) {
      var articlesFromGET = data || [];
      self.userArticles(articlesFromGET);
      self.updateUserArticles(articlesFromGET);
    });
  };

  self.updateUserArticles = function (articles) {
    self.userArticles(articles);
    var articleTitlesFromData = {};
    for (var file in self.userArticles()) {
      var article = self.userArticles()[file];
      articleTitlesFromData[article.title] = true;
    }
    self.userArticleTitleSet(articleTitlesFromData);
  };

  // wrapper method to check if an article already exists
  self.saveArticleData = function (data, event) {
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
    var userArticlesUrl = configDatabaseTest +
                     'api/users/' +
                      self.userId() +
                      '/articles';
    $.ajax({
      type: 'POST',
      url: userArticlesUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleData)
    }).done(function (data) {
      self.updateUserArticles(data.updatedUserArticles);
    }).fail(function () {
    });
  };

  self.putExistingArticleDataToUser = function (articleData) { 
    var userArticlesUrl = configDatabaseTest +
                      'api/users/' +
                      self.userId() + 
                      '/articles';

    $.ajax({
      type: 'PUT',
      url: userArticlesUrl,
      contentType: 'application/json',
      data: JSON.stringify(articleData)
    }).done(function () {
      // I guess update the UserArticles property in the VM
    }).fail(function () {
      console.log('failed to PUT to ' + userArticlesUrl);
    });
  };

  self.publishArticleData = function (data, event) {
    var articleInfoUrl = configDatabaseTest +
                      'api/articles/';


    $.getJSON(articleInfoUrl).then(function (data) {
      var articlesFromGET = data || [],
          articleTitles = self.getAllPublishedArticleTitles(data);
          articleData = {
            articleId: self.articleId(),
            title: self.title(),
            topic: self.topic(),
            text: self.text()
          };

      if(articleTitles[articleData.title]) {
        self.putArticleDataToPublished(articleData);
        self.putExistingArticleDataToUser(articleData);
      } else {
        self.postArticleDataToPublished(articleData);
        self.putNewArticleDataToUser(articleData);
      }
    }); 
  };

  self.postArticleDataToPublished = function (articleData) {
    var articlePOSTUrl = configDatabaseTest + 'api/articles/';
    $.post(articlePOSTUrl, articleData, function (res) {
      if (res.message.indexOf('success') === -1) {
        console.log('failed to post ' + articleData.id);
      } else {
        console.log('post of: ' + res.newArticleId + ' is a success');
      }
    });
  };

  self.putArticleDataToPublished = function (articleData) {
    var articlePUTUrl = configDatabaseTest + 'api/articles/';
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

  self.getAllPublishedArticleTitles = function (data) {
    var articleTitlesFromData = {};
    for (var i = 0; i < data.length; i++) {
      if (data[i].title){
        articleTitlesFromData[data[i].title] = true;
      }
    }
    return articleTitlesFromData;  
  };

  self.loadArticleData = function (data, event) {
    self.articleId(data._id);    
    self.title(data.title);
    self.topic(data.topic);
    self.text(data.text);
    self.tags(data.tags);
  };

  self.resetArticleFields = function (data, event) {
    self.topic(null);
    self.title(null);
    self.text(null);
    self.tags(null);
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