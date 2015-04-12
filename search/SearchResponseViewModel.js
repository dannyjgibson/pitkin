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

var SearchItem = function (text, url, image) {
  var self = this;
  self.url = url || '';
  self.image = image || '';
  self.text = text || '';
  return self;
};

function SearchResponseViewModel() {
  var self = this;
  self.abstractText = ko.observable();
  self.query = ko.observable('Pitkin County'); // undefined in the query string returns a 403, ergo...
  self.responses = ko.observableArray();
  self.heading = ko.observable();
  self.abstractUrl = ko.observable();
  self.results = ko.observable(false);

  self.searchDuckDuckGo = function() {
    console.log('getting duckduckgo ' + self.query());
    $.ajax({
      type: 'GET',
      url: 'https://api.duckduckgo.com/',
      data: { q: self.query(), format: 'json', t: 'pitkin'},
      jsonpCallback: 'jsonp',
      dataType: 'jsonp'
    }).then(function (ddgData) {
      self.mapSearchResults(ddgData);
    });
  };

  self.mapSearchResults = function (ddgData) {
    self.results(true);
    self.abstractUrl(ddgData.AbstractURL);
    self.heading(ddgData.Heading);
    console.log(ddgData.AbstractURL);
    self.abstractText(ddgData.AbstractText);
    var topics = ddgData.RelatedTopics,
        searchResults = [];
    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i],
          resultItem = new SearchItem(addNewTabTarget(topic.Result), topic.FirstURL,topic.Icon);
      searchResults.push(resultItem);
    }
    self.responses(searchResults);
  };

  self.updateSearch = function (item, event) {
    var val = $(event.target).text();
    self.query(val);
    self.searchDuckDuckGo();
  };
}

var addNewTabTarget = function(html) {
  console.log('html'+  html);
  var toAdd = ' target="_newtab"',
      splitHtml= html.split(" ");
  console.log('first index: ' + splitHtml[0]);
  splitHtml[0] = splitHtml[0].concat(toAdd);
  console.log('first index: ' + splitHtml[0]);
  return splitHtml.join(' ');
};

ko.applyBindings(new SearchResponseViewModel());
