// model should be set with a get to the db
var config = require('../config');

// not every attribute on the model gets added to the Article View Model
function WriteViewModel (model) {
  var self = this;
  self.topic = kb.observable();
  self.title = kb.observable();
  self.text = kb.observable();
  self.tags = kb.observableArray();
  self.writerName = ko.observable();
  self.files = ko.observableArray();

  self.getWriteInformation = function (userId) {

  };

  self.postWriteInformation = function(updated) {

  };

  self.addTags = function (data, event){
    if (event.keycode === 13) {
      var toAdd = data.split(/,?\s+/);
      ko.tags(Array.prototype.push.apply(self.tags(), toAdd));        
    }
  };
}