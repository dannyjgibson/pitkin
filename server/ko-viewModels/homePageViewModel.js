// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

function Article(articleData) {
  var self = this;
  self._id = articleData._id;
  self.topic = ko.observable(articleData.topic);
  self.title = ko.observable(articleData.title);
  self.author = ko.observable(articleData.author);
  self.location = ko.observable(articleData.location);
  self.publishDate = ko.observable(articleData.publishDate);
  self.createdAt = ko.observable(articleData.createdAt);
  self.updatedAt = ko.observable(articleData.updatedAt);
  self.text = ko.observable(articleData.text);
  self.tags = ko.observable(articleData.tags);
  self.offensiveToSomeone = ko.observable(articleData.offensiveToSomeone);
}

function HomePageViewModel () {
  var self = this;
  self.articles = ko.observableArray();
  self.addedTags = ko.observable({});

  self.getArticles = function () {
    var articleUrl = configDatabaseTest + 'api/articles/';
    $.getJSON(articleUrl, function (articles) {
      var articleCollection = [];
      for (var i = 0; i < articles.length; i++) {
        var article = new Article(articles[i]);
        articleCollection.push(article);
      }
      self.articles(articleCollection);
    });      
  };

  self.flagAsOffensive = function (item, event) {
    var articleUrl = configDatabaseTest +
                    'api/articles/' +
                    item._id,
        data = {offensiveToSomeone: true};
    $.ajax({
      data: data,
      url: articleUrl,
      method:'PUT',
      success: function() {
        console.log('success putting to ' + articleUrl);
      },
      dataType: 'json'
    });
  };

  self.addTags = function (item, event) {
    var itemId = item._id;
        articleUrl = configDatabaseTest +
                     'api/articles/' +
                     itemId,
        tags = (item.tags()).concat(self.addedTags()[itemId].split(/,?\s+/)),
        updatedData = {tags: tags};
        console.log(self.addedTags());
    $.ajax({
      data: JSON.stringify(updatedData),
      url: articleUrl,
      method: 'PUT',
      contentType: 'application/json',
      success: function (data) {
        console.log(data.message);
      }
    });


    for (var i = 0; i < self.articles().length; i++) {
      if (self.articles()[i]._id === itemId) {
        var updatedArticle = self.articles()[i];
        updatedArticle.tags(tags);
        self.articles.replace(self.articles()[i], updatedArticle);
        break;
      }
    }
  };
  
  self.getArticles();
}

ko.applyBindings(new HomePageViewModel());