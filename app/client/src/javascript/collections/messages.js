var Message = require('../models/message');
var Messages = module.exports = Backbone.Collection.extend({
	model: Message,
	 comparator: function(m) {
	 	var date = new Date(m.get('sent'));
        return date.getTime();
    }
});