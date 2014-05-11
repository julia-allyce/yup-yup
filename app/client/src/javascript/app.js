_          = require('underscore');
Backbone   = require('backbone');
Backbone.$ = require('jquery');
HomeView = require('./views/home');
MenuView = require('./views/menu');

homeView = new HomeView({ el: Backbone.$('.content')}).render();
menuView = new MenuView({ el: Backbone.$('.side-nav')}).render();