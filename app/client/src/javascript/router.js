var Workspace = module.exports = Backbone.Router.extend({
  routes: {
  	'inbox'  : 'inbox',
  	'signin' : 'signin',
    'signup' : 'signup',
    'conversation/:user' : 'conversation'
  },
  inbox: function () {
    if(App.User.get('isAuthenticated'))
  	 App.View.renderChildView('.content', App.Views.Inbox);
    else
      this.navigate('signin', {trigger: true});
  },
  signin: function () {
  	App.View.renderChildView('.content', App.Views.Signin);
  },
  signup: function () {
    App.View.renderChildView('.content', App.Views.Signup);
  },
  conversation: function (user) {
    if(App.User.get('isAuthenticated')) {
      App.CurrentConversation = App.Conversations.findWhere({userLookUp: user});
      App.TalkingTo = user;
      App.View.renderChildView('.content', App.Views.Conversation);
    } else
      this.navigate('signin', {trigger: true});
  }
});