var Message = module.exports = Backbone.Model.extend({
	idAttribute: "_id",
	parse:function (response) {
		var direction = 'incoming';
		if(response.user === App.User.get('_id'))
			direction = 'outgoing';
		this.set('direction', direction);
		this.set('timestamp', new Date(response.sent));
		return response;
	},
	format: function () {
		var direction = 'incoming';
		if(this.get('user') === App.User.get('_id'))
			direction = 'outgoing';
		this.set('direction', direction);
		this.set('timestamp', new Date(this.get('sent')));
	}
});