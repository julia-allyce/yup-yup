var User = require('../models/user');
var Users = module.exports = Backbone.Collection.extend({
	model: User,
	url: function () {
		return App.apiRoot + 'users';
	}
});