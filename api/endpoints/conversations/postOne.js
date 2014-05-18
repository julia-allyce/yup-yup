var Conversation = require('../../models/conversation'),
	mongoose = require('mongoose-q')(require('mongoose')),
	_ = require('underscore'),
	newMsg;

module.exports = function(req, res) {
	console.log('entering whatever');
	Conversation.findByIdQ(req.params.convo_id)
		.then(function(convo) {
			newMsg = convo.messages.create(req.body);
			newMsg.conversation = convo._id;
			convo.messages.push(newMsg);
			return convo;
		})
		.then(function (convo) {
			console.log('saving convo');
			convo.saveQ()
			.then(function(result) {
				res.status(201).json(newMsg);
				return convo;
			})
			.then(function(convo){
					console.log(JSON.stringify(newMsg), 'hi');
					global.lastMessage = newMsg;
				_.each(convo.participants, function(id){
					io.sockets.to(id).emit('newChat', newMsg.toObject());
				});
			})
			.fail(function (err) {
				res.status(500).send();
			})
			.done();

		})
		.fail(function (err) {
			res.status(500).send();
			console.log(err);
		})
		.done();

};