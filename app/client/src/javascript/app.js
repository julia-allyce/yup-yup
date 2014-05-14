_          = require('underscore');
Backbone   = require('backbone');
Backbone.$ = require('jquery');

var MasterView = require('./views/masterView'),
	Router = require('./router');

App = {
	apiRoot: 'http://localhost:8080/api/',
	Events: _.extend({},Backbone.Events),
	Collections: {},
	Models: require('./models/config'),
	View: new MasterView({ el: Backbone.$('body') }),
	Views: require('./views/config'),
	Router: new Router()
};
App.User = new App.Models.User();

Backbone.$(document).ready(function(){
	Backbone.history.start({pushState: true, root:'/app/'});
	var currentPath = document.URL.split('/app/');
	App.View.render();
	if(!App.User.get('isAuthenticated')) {
		App.Router.navigate("signin", {trigger: true});
	} else if(currentPath[1].length > 1)
		App.Router.navigate(currentPath[1], {trigger: true});
});
