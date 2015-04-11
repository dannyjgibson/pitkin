ko.bindingHandlers.executeOnEnter = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var allBindings = allBindingsAccessor();
    $(element).keypress(function (event) {
      var keyCode = (event.which ? event.which : event.keyCode);
      if (keyCode === 13) {
        allBindings.executeOnEnter.call(viewModel);
        return false;
      }
      return true;
    });
  }
};

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
  self.abstractText = ko.observable();
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
    self.abstractText(ddgData.AbstractText);
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