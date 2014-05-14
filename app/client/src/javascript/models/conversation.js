var _ = require('underscore');
var Conversation = module.exports = Backbone.Model.extend({
	idAttribute: "_id",
	parse: function (response) {
		if(response.messages) {
			this.set('messages', new App.Collections.Messages(response.messages));
			delete response.messages;
		}
		this.set('userLookUp', _.chain(response.participants)
			.filter(function(id){
				return (id !== App.User.get('_id'));
			})
			.first()
			.value()
		);
		return response;
	}
});