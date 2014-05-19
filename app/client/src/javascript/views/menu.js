module.exports = Backbone.View.extend({
	template: require('../templates/menu'),
	modelTemp: require('../templates/menu-item'),
	initialize: function () {
		this.collection = App.Conversations;
		this.listenTo(this.collection, 'add', this.addOne);
	},
	events: {
		'click #newConvo':'openConversation'
	},
	render: function () {
		this.$el.html(this.template());
		this.addAll();
		return this;
	},
	addAll:function () {
		this.collection.each(function (model) {
			this.addOne(model);
		},this);
	},
	addOne:function (model) {
		this.$('menu').append(new App.Views.MenuItem({model: model}).render().el);
	},
	openConversation: function (e) {
		e.preventDefault();
		Backbone.$('menu li').removeClass('active');
		App.Router.navigate('conversation/', {trigger: true});
	} 
})