module.exports = Backbone.View.extend({
	template: require('../templates/conversation'),
	initialize: function () {
		this.prevKey = '';
		this.model = App.CurrentConversation;
	},
	events: {
		'click .send':'send',
		'keydown .content':'keydown'
	},
	render: function () {
		this.$el.append(this.template());
		if (!_.isUndefined(this.model)){
			this.addAll();
		}
		return this;
	},
	addAll:function (argument) {
		this.$('.title').html(this.model.get('alias'));
		this.model.get('messages').each(function (model) {
			this.addOne(model);
		}, this);
	},
	addOne:function (model) {
		model.format();
		this.$('.conversation-window').append(new App.Views.Message({model:model}).render().el);
	},
	keydown:function (e) {
		this.$('.content').removeClass('error');
		if (e.keyCode == 13 && this.prevKey !== 16) {
			this.send(e);
		}
		this.prevKey = e.keyCode;
	},
	send:function  (e) {
		e.preventDefault();

		var msg = this.$('.content').val();

		if (msg.length < 1) {
			this.$('.content').addClass('error').attr('placeholder', 'Cannot Send Blank Message');
			return;
		}

		var data = {
				content:msg,
				user:App.User.get('_id'),
			},
			creds = {email: App.User.get('email'), password: App.User.get('password')};

		if (!_.isUndefined(this.model)) {

			var newMsg = new App.Models.Message(_.extend(data, creds));

			newMsg.sync('create', newMsg, {
				url: App.apiRoot + 'conversations/' + this.model.get('_id'),
				success: _.bind(function (res, model) {
					console.log(arguments);
					newMsg.set({'sent': new Date()});
					this.addOne(newMsg);
					this.$('.content').val('');
				}, this)
			});
		} else {
			var newCol = new App.Models.Conversation(_.extend( creds,
				{
					messages:[data],
					alias: App.User.get('friends').findWhere({_id: App.TalkingTo}).get('name'),
					participants:[App.User.get('_id'), App.TalkingTo]
				}));

			newCol.sync('create', newCol, {
				url: App.apiRoot + 'conversations',
				success: _.bind(function (model) {
					App.Conversations.add(model);
					this.model = App.Conversations.get(model._id);
					_.bind(this.addAll(),this);
				}, this)
			})
		}
	}
})