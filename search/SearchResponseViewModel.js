var SearchItem = function (text, result, url, image) {
  var self = this;
  self.url = url || '';
  self.image = image || '';
  self.text = text || '';
  self.result = result || '';   
  return self;
};

function SearchResponseViewModel() {
  var self = this;
  self.query = ko.observable('fear-and-loathing'); // undefined in the query string returns a 403, ergo...
  self.responses = ko.observableArray();
  self.heading = ko.observable();

  self.searchDuckDuckGo = function() {
    $.ajax({
      type: 'GET',
      url: 'https://api.duckduckgo.com/',
      data: { q: self.query(), format: 'json'},
      jsonpCallback: 'jsonp',
      dataType: 'jsonp'
    }).then(function (ddgData) {
      self.mapSearchResults(ddgData);
    });
  };

  self.mapSearchResults = function (ddgData) {
    self.heading(ddgData.Heading);
    var topics = ddgData.RelatedTopics,
        searchResults = [];
    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i],
          resultItem = new SearchItem(topic.Text, topic.Result, topic.FirstURL,topic.Icon);
      searchResults.push(resultItem);
    }
    self.responses(searchResults);
  };
}

var formatQueryForSearch = function (query) {

};

var formatQueryForFrontEnd = function (query) {

};

ko.applyBindings(new SearchResponseViewModel());