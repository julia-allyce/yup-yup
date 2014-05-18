var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    _			 = require('underscore'),
    Message      = require('./message');

var ConversationSchema   = new Schema({
	alias: {type: String, default: ''},
	participants: [Schema.Types.ObjectId],
	updatedAt: {
		type: Date,
		default: Date.now
	},
	messages: [Message]
});

ConversationSchema.methods.addProps = function(obj) {
	if(obj) {
		if(obj.alias)
			this.alias = obj.alias;

		if(obj.participants.length > 1) {
			var arr = [];
			_.map(obj.participants, function(id) {
				arr.push(mongoose.Types.ObjectId(id));
			});
			this.participants = arr;
		}

		if(obj.messages) {
			this.messages = obj.messages;
		}
	}
    return this;
};

module.exports = mongoose.model('Conversation', ConversationSchema);