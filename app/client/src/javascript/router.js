var Workspace = module.exports = Backbone.Router.extend({
  routes: {
  	'inbox'  : 'inbox',
  	'signin' : 'signin',
    'signup' : 'signup',
    'conversation/(:convo_id)' : 'conversation'
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
  conversation: function (convo_id) {
    if(App.User.get('isAuthenticated')) {
      if(convo_id) {
        App.CurrentConversation = App.Conversations.get(convo_id);
      } else {
        App.CurrentConversation = new App.Models.Conversation({ 
          messages: new App.Collections.Messages(),
          participants: [App.User.id]
        });
      }
      App.View.renderChildView('.content', App.Views.Conversation);
    } else
      this.navigate('signin', {trigger: true});
  }
});