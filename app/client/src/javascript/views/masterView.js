var view = module.exports = Backbone.View.extend({
	template: require('../templates/master'),
	childView: false,
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
		if(this[selector]) {
			this[selector].remove();
		}
		this[selector] = new view();
		this.$(selector).html(this[selector].render().el);
	},
	toggleMenu:function (e) {
		e.preventDefault();
		this.$('.side-nav').toggleClass('open');
	},
	changeUserState: function (model, value) {
		if(model.get('isAuthenticated')) {
			this.$('.user-state').html('Log Out');
		} else {
			this.$('.user-state').html('Log In');
		}
	},
	toggleState: function () {
		if(App.User.get('isAuthenticated')) {
			App.User.signout(App.User);
		} else {
			App.Router.navigate("signin", {trigger: true});
		}
	}
});