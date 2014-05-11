_          = require('underscore');
Backbone   = require('backbone');
Backbone.$ = require('jquery');
View = require('./views/home');

view = new View({ el: Backbone.$('#content')}).render();