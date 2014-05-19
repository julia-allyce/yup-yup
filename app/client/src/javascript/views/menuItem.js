module.exports = Backbone.View.extend({
	tagName:'li',
	template: require('../templates/menu-item'),
	initialize: function () {
		this.listenTo(this.model.get('messages'), 'add', this.newChat);
	},
	events: {
		'click a':'openConversation'
	},
	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	},
	newChat:function (message) {
		if(message.get('user') !== App.User.id) {
			this.$('a').addClass('newChat');
		}
	},
	openConversation: function (e) {
		e.preventDefault();
		var convo_id = e.currentTarget.id;
		this.$('a').removeClass('newChat');
		Backbone.$('menu li').removeClass('active');
		this.$el.addClass('active');
		App.Router.navigate('conversation/'+ convo_id, {trigger: true});
	} 
})