var Conversation = require('../models/conversation');
var Conversations = module.exports = Backbone.Collection.extend({
	model: Conversation,
	url: function () {
		return App.apiRoot + 'conversations';
	}
});