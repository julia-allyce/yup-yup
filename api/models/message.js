var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema = module.exports = new Schema({
	user: Schema.Types.ObjectId,
	sent: {
		type: Date,
		default: Date.now
	},
	content: String
});

// module.exports = mongoose.model('Message', MessageSchema);