var User = module.exports = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		isAuthenticated: false
	},
	parse:function (response) {
		if(response) {
			if(response.friends) {
				this.set('friends', new App.Collections.Users(response.friends));
				delete response.friends;
			}
			return response;
		}
	},
	signout: function () {
		this.fetch({
			url: App.apiRoot + 'signout',
			success: function (model) {
				model.unset('name',{silent: true});
				model.unset('friends',{silent: true});
				model.unset('email',{silent: true});
				model.unset('handle',{silent: true});
				model.unset('bio',{silent: true});
				model.unset('_id',{silent: true});
				model.unset('password',{silent: true});
				model.set('isAuthenticated', false);
			}
		});
	}
});