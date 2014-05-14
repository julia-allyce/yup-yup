var view = module.exports = Backbone.View.extend({
	template: require('../templates/master'),
	child: {},
	initialize: function () {
		this.listenTo(App.User, 'change:isAuthenticated', this.changeUserState);
	},
	events: {
		'click .menu-link':'toggleMenu',
		'click .user-state':'toggleState',
	},
	render: function () {
		this.$el.append(this.template());
		return this;
	},
	renderChildView: function(selector, view) {
		if(this.child[selector]) {
			this.child[selector].remove();
		}
		this.child[selector] = new view();
		this.$(selector).html(this.child[selector].render().el);
	},
	toggleMenu:function (e) {
		e.preventDefault();
		this.$('.side-nav').toggleClass('open');
	},
	changeUserState: function (model, value) {
		if(model.get('isAuthenticated')) {
			this.$('.user-state').html('Log Out');
			this.$('.menu-link').removeClass('hidden');
		} else {
			this.$('.side-nav').removeClass('open');
			if(App.View.child['.side-nav'])
				App.View.child['.side-nav'].remove();
			this.$('.user-state').html('Log In');
			this.$('.menu-link').removeClass('hidden');
		}
	},
	toggleState: function () {
		if(App.User.get('isAuthenticated')) {
			App.User.signout(App.User);
			App.Router.navigate("signin", {trigger: true});
		} else {
			App.Router.navigate("signin", {trigger: true});
		}
	}
});