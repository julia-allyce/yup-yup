var _ = require('underscore');
var Conversation = require('../models/conversation');
var Conversations = module.exports = Backbone.Collection.extend({
	model: Conversation,
	initialize:function() {
		this.listenTo(this, 'add', this.parseMessages);
	},
	url: function () {
		return App.apiRoot + 'conversations';
	},
	parseMessages:function(convo) {
		var messages = convo.get('messages');

		if(!_.isArray(messages)) {
			return;
		}

		convo.set('userLookUp', _.chain(convo.get('participants'))
			.filter(function(id){
				return (id !== App.User.id);
			})
			.first()
			.value()
		);

		messageCol = new App.Collections.Messages(messages);

		convo.set('messages', messageCol);

	}
});