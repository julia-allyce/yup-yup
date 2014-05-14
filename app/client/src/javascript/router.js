var Workspace = module.exports = Backbone.Router.extend({
  routes: {
  	'inbox'  : 'inbox',
  	'signin' : 'signin',
    'signup' : 'signup'
  },

  inbox: function () {
  	console.log('you are in the inbox');
  },
  signin: function () {
  	App.View.renderChildView('.content', App.Views.Signin);
  },
  signup: function () {
    App.View.renderChildView('.content', App.Views.Signup);
  }
});