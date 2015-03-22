// model should be set with a get to the db
var model = new Backbone.Model({});

// not every attribute on the model gets added to the Article View Model
var ArticleViewModel = function (model) {
  this.topic = kb.observable(model, 'topic') || this.topic;
  this.title = kb.observable(model, 'title') || this.title;
  this.updated_at = kb.observable(model, 'updated_at') || this.updated_at;
  this.text = kb.observable(model, 'text') || this.text;
  this.actions = kb.observable(model, 'actions') || this.actions;
  this.tags = kb.observable(model, 'tags') || this.tags;
};

var article_view_model = new ArticleViewModel(model);

ko.applyBindings(article_view_model, $('#kb_observable')[0]);