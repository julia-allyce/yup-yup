module.exports = Backbone.View.extend({
	template: require('../templates/conversation'),
	initialize: function () {
		this.prevKey = '';
		this.model = App.CurrentConversation;
		this.listenTo(this.model.get('messages'), 'add', this.addOne);
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
		this.scrollBottom();
	},
	scrollBottom: function () {
		var convoDiv = this.$(".conversation-window")[0];
		setTimeout( function () {
			Backbone.$(window).scrollTop(convoDiv.scrollHeight);
		}, 10);
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

		if (!this.collection.isNew()) {
			var newMsg = new App.Models.Message(_.extend(data, creds));
			newMsg.sync('create', newMsg, {
				url: App.apiRoot + 'conversations/' + this.model.get('_id')
			});
		} else {
			if(this.collection.get('participants').length > 1) {
				this.collection.sync('create', this.collection, {
					url: App.apiRoot + 'conversations',
					data:creds
				});
			} else {
				//err it out
			}
		}
	}
})