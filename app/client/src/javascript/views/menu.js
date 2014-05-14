module.exports = Backbone.View.extend({
	template: require('../templates/menu'),
	modelTemp: require('../templates/menu-item'),
	initialize: function () {
		this.collection = App.User.get('friends');
	},
	events: {
		'click a':'openConversation'
	},
	render: function () {
		this.$el.html(this.template());
		Backbone.$('.menu-link').removeClass('hidden');
		if(this.collection){
			this.collection.each(_.bind(function (model) {
				if(model.get('_id') !== App.User.get('_id')){
					this.$('menu').append(this.modelTemp(model.toJSON()));
				}
			}, this));
		} else {
			this.$('menu').append('<em>You have no friends :(</em>');
		}
		return this;
	},
	openConversation: function (e) {
		e.preventDefault();
		var user = e.currentTarget.id;
		App.Router.navigate('conversation/'+ user, {trigger: true});
	} 
})