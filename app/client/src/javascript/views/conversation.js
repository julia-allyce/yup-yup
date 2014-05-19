module.exports = Backbone.View.extend({
	template: require('../templates/conversation'),
	initialize: function () {
		this.prevKey = '';
		this.model = App.CurrentConversation;
		this.listenTo(this.model.get('messages'), 'add', this.addNewOne);
		this.listenTo(this.model, 'change:participants', this.newParticipant);
	},
	events: {
		'click .send':'send',
		'keydown .content':'keydown',
		'focus .content':'contentFocus'
	},
	render: function () {
		this.$el.append(this.template());
		if (this.model.get('messages').length > 0) {
			this.addAll();
		} else {
			this.$('.conversation-window').append(new App.Views.FriendInput({model:this.model}).render().el);
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
	addOne:function (model) {
		model.format();
		this.$('.conversation-window').append(new App.Views.Message({model:model}).render().el);
	},
	addNewOne:function (model) {
		this.addOne(model);
		this.scrollBottom();
	},
	keydown:function (e) {
		this.$('.content').removeClass('error');
		if (e.keyCode == 13 && this.prevKey !== 16) {
			this.send(e);
		}
		this.prevKey = e.keyCode;
	},
	scrollBottom: function () {
		var convoDiv = this.$(".conversation-window")[0];
		setTimeout( function () {
			Backbone.$(window).scrollTop(convoDiv.scrollHeight);
		}, 10);
	},
	newParticipant:function () {
		// console.log('newParticipant');
	},
	contentFocus:function () {
		var id = this.model.id;
		Backbone.$('a#'+id).removeClass('newChat newConversation');
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

		if (!this.model.isNew()) {
			var newMsg = new App.Models.Message(_.extend(data, creds));
			newMsg.sync('create', newMsg, {
				url: App.apiRoot + 'conversations/' + this.model.get('_id'),
				success:_.bind(function () {
					this.$('.content').val('');
				}, this)
			});
		} else {
			if(this.model.get('participants').length > 1) {
				this.model.set(_.extend(creds,{messages: [data] }));
				this.model.set('alias', App.User.get('handle') +
					' & ' + App.User.get('friends').get(this.model.get('participants')[1]).get('handle'));
				this.model.sync('create', this.model, {
					url: App.apiRoot + 'conversations',
					success:function (conversation) {
						setTimeout(function(){
							App.Router.navigate('conversation/' + conversation._id, {trigger: true});
						}, 10);
					}
				});
			} else {
				//err it out
			}
		}
	}
})