module.exports = Backbone.View.extend({
	template: require('../templates/inbox'),
	initialize: function () {
		App.View.renderChildView('.side-nav', App.Views.Menu);
		if ((_.isUndefined(App.Conversations) || App.Conversations.isEmpty() ) && App.User.get('isAuthenticated')) {
			App.Conversations = new App.Collections.Conversations();

			App.Conversations.fetch({
				data: {email: App.User.get('email'), password: App.User.get('password')}
			});
		}

		if (!App.Socket) {
			App.Socket = require('../socket');
		}
	},
	render: function () {
		this.$el.append(this.template());
		return this;
	}
})