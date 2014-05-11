var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Message      = require('./message');

var ConversationSchema   = new Schema({
	alias: String,
	paticipants: [Schema.Types.ObjectId],
	updatedAt: {
		type: Date,
		default: Date.now
	},
	messages: [Message]
});

module.exports = mongoose.model('Conversation', ConversationSchema);