_          = require('underscore');
Backbone   = require('backbone');
Backbone.$ = require('jquery');

var MasterView = require('./views/masterView'),
	Router = require('./router');

App = {
	apiRoot: 'http://localhost:8080/api/',
	Events: _.extend({},Backbone.Events),
	Models: require('./models/config'),
	Collections: require('./collections/config'),
	Views: require('./views/config'),
	Router: new Router()
};
App.User = new App.Models.User();
App.View = new MasterView({ el: Backbone.$('body') });
Backbone.history.start({pushState: true, root:'/app/'});

Backbone.$(document).ready(function(){
	App.View.render();
	var currentPath = document.URL.split('/app/');
	App.Router.navigate("signin", {trigger: true});

});
