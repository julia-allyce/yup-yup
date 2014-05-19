module.exports = Backbone.View.extend({
	template: require('../templates/friendInput'),
	childTemp: require('../templates/friendInputOption'),
	initialize: function () {
	},
	events: {
		'click .selectFriend': 'openList',
		'click .friendOption': 'addFriend'
	},
	openList:function(e) {
		e.preventDefault();
		this.$('.friendList').removeClass('close').addClass('open');

	},
	render: function () {
		this.$el.append(this.template());
		App.User.get('friends').each(function(model){
			this.$('ul').append(this.childTemp(model.toJSON()));
		}, this);
		return this;
	},
	addFriend: function (e) {
		e.preventDefault();
		var participant = this.$(e.currentTarget).attr('href'),
			alias = this.$(e.currentTarget).html();

		this.$('a').removeClass('selected');
		this.$(e.currentTarget).addClass('selected');
		this.model.set('participants', [App.User.id, participant]);
		this.$('.selectFriend').html(alias);
		this.$('.friendList')
			.removeClass('open')
			.addClass('close')
			.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
				Backbone.$(this).removeClass('close');
		});

	}
})