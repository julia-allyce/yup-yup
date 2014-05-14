module.exports = Backbone.View.extend({
	initialize:function (options) {
		this.model = App.User;
	},
	template: require('../templates/signup'),
	events: {
		'click .sign-up':'signup'
	},
	render: function () {
		this.$el.append(this.template());
		return this;
	},
	signup: function (e) {
		e.preventDefault();
		var data = {
			email: this.$('#email').val(),
			password: this.$('#password').val(),
			name: this.$('#name').val(),
			handle: this.$('#handle').val()			
		};

		this.$('input').removeClass('error');
		this.$('.error-msg').removeClass('alert-error').html('');
		Backbone.$(e).attr('disabled', true).html('Loading...');

		this.model.save(data, {
			method:'POST',
			url: App.apiRoot + 'users',
			success: _.bind(this.onSignup, this),
			error: _.bind(this.onError, this),
		});

		this.model.unset('password', { silent: true });

	},
	onSignup: function() {
		this.model.set('isAuthenticated', true);
		App.Router.navigate("inbox", {trigger: true});
	},
	onError: function(model, response) {
		Backbone.$('.sign-in').attr('disabled', false).html('Try Again');
		this.$('input').addClass('error');
		this.$('.error-msg').addClass('alert-error').html(response.responseJSON);
	}
})