module.exports = Backbone.View.extend({
	template: require('../templates/menu'),
	modelTemp: require('../templates/menu-item'),
	initialize: function () {
		this.collection = App.Conversations;
	},
	events: {
		'click a':'openConversation'
	},
	render: function () {
		this.$el.html(this.template());
		if(this.collection){
			this.collection.each(_.bind(function (model) {
				this.$('menu').append(this.modelTemp(model.toJSON()));
			}, this));
		} else {
			this.$('menu').append('<em>You have no conversations :(</em>');
		}
		this.$('menu').prepend(this.modelTemp({ _id:'', alias:'Start a Convo'}));
		return this;
	},
	openConversation: function (e) {
		e.preventDefault();
		var convo_id = e.currentTarget.id;
		App.Router.navigate('conversation/'+ convo_id, {trigger: true});
	} 
})