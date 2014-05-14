module.exports = Backbone.View.extend({
	template: require('../templates/signin'),
	events: {
		'click .sign-in':'signin',
		'click .sign-up':'signup',
		'keydown #password':'onEnter'
	},
	render: function () {
		this.$el.append(this.template());
		return this;
	},
	signin: function (e) {
		e.preventDefault();
		var data = {
			email: this.$('#email').val(),
			password: this.$('#password').val()
		};

		this.$('input').removeClass('error');
		this.$('.error-msg').removeClass('alert-error').html('');
		Backbone.$(e).attr('disabled', true).html('Loading...');

		App.User.save(data, {
			method:'POST',
			url: App.apiRoot + 'signin',
			success: _.bind(this.onLogin, this),
			error: _.bind(this.onError, this),
		});
	},
	onEnter: function (e) {
		if(e.keyCode == 13)
			this.signin(e);
	},
	signup: function(e) {
		e.preventDefault();
		App.Router.navigate("signup", {trigger: true});
	},
	onLogin: function() {
		App.User.set('isAuthenticated', true);
		App.Router.navigate("inbox", {trigger: true});
	},
	onError: function() {
		Backbone.$('.sign-in').attr('disabled', false).html('Try Again');
		this.$('input').addClass('error');
		this.$('.error-msg').addClass('alert-error').html('Incorrect Login');
	}
})