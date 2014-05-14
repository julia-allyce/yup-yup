var Workspace = module.exports = Backbone.Router.extend({
  routes: {
  	'inbox'  : 'inbox',
  	'signin' : 'signin',
    'signup' : 'signup',
    'conversation/:user' : 'conversation'
  },

  inbox: function () {
  	App.View.renderChildView('.content', App.Views.Inbox);
  },
  signin: function () {
  	App.View.renderChildView('.content', App.Views.Signin);
  },
  signup: function () {
    App.View.renderChildView('.content', App.Views.Signup);
  },
  conversation: function (user) {
    App.CurrentConversation = App.Conversations.findWhere({userLookUp: user});
    App.TalkingTo = user;
    App.View.renderChildView('.content', App.Views.Conversation);
  }
});