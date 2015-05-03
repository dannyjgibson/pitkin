// model should be set with a get to the db
//var config = require('../config');

// This is a crappy shim, and requireJS is the way out
var configDatabaseTest = 'http://localhost:3000/';

function HomePageViewModel () {
  var self = this;
  self.articles = ko.observableArray();
  self.addedTags = ko.observable({});

  self.getArticles = function () {
    var articleUrl = configDatabaseTest + 'api/articles/';
    $.getJSON(articleUrl, function (articles) {
      self.articles(articles);
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
        existingTags = (item.tags).concat(self.addedTags()[itemId].split(/,?\s+/)),
        updatedData = {tags: existingTags};
    $.ajax({
      data: JSON.stringify(updatedData),
      url: articleUrl,
      method: 'PUT',
      contentType: 'application/json',
      success: function (data) {
        console.log('success in putting to ' + articleUrl);
      }
    });
  };
  self.getArticles();
}

ko.applyBindings(new HomePageViewModel());