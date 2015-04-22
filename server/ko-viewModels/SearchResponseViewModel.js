var SearchItem = function (text, url, image) {
  var self = this;
  self.url = url || '';
  self.image = image || '';
  self.text = text || '';
  return self;
};

function SearchResponseViewModel() {
  var self = this;
  self.query = ko.observable('Pitkin County'); // undefined in the query string returns a 403, ergo...
  self.responses = ko.observableArray();
  self.heading = ko.observable();
  self.abstractUrl = ko.observable();
  self.abstractText = ko.observable();
  self.abstractImage = ko.observable();
  self.results = ko.observable(false);

  self.searchDuckDuckGo = function(item, event) {
    var keyCode = event.which || event.keyCode;
    // keypress in the search, not enter or click
    if (keyCode !== 13 && keyCode !== 1) {
      return true;
    }
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
    return true;
  };

  self.mapSearchResults = function (ddgData) {
    self.results(true);
    self.abstractUrl(ddgData.AbstractURL);
    self.heading(ddgData.Heading);
    self.abstractText(ddgData.AbstractText);
    self.abstractImage(ddgData.Image);
    var topics = ddgData.RelatedTopics,
        searchResults = [];
    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i];
      if (topic.Result !== undefined) {
        var resultItem = new SearchItem(addNewTabTarget(topic.Result), topic.FirstURL,topic.Icon);
        searchResults.push(resultItem);
      }
    }
    self.responses(searchResults);
  };

  self.updateSearch = function (item, event) {
    if (event.type === 'click') {
      var clickedLinkedTopic = stripUrlToEndpoint(item.url).replace(/_/g, ' ');
      console.log('clicked on: ' + clickedLinkedTopic);
      self.query(clickedLinkedTopic);
      self.searchDuckDuckGo(item, event);  
    }
  };
}

var addNewTabTarget = function(html) {
  var toAdd = ' target="_newtab"',
      splitHtml= html.split(" ");
  splitHtml[0] = splitHtml[0].concat(toAdd);
  return splitHtml.join(' ');
};

var stripUrlToEndpoint = function(url) {
  return url.substr(url.lastIndexOf('/') + 1);
};

ko.applyBindings(new SearchResponseViewModel());
