var Conversation = require('../../models/conversation'),
	mongoose = require('mongoose-q')(require('mongoose')),
	_ = require('underscore');

module.exports = function(req, res) {
	var convo = new Conversation();
	
	if (!_.isUndefined(req.body.messages)) {
		_.each(req.body.messages, function(msg) {
			msg.conversation = convo._id;
		});
	}
	
	convo.addProps(req.body);
	
	convo.saveQ()
		.then(function(convo){
			res.status(201).json(convo);
			_.each(convo.participants, function(id) {
				io.sockets.to(id).emit('newConversation', convo.toObject());
			});
		})
		.fail(function(err){
			res.status(500).json(err);
			console.log(err);
		})
		.done();
};