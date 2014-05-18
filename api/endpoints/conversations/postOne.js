var Conversation = require('../../models/conversation'),
	mongoose = require('mongoose-q')(require('mongoose')),
	_ = require('underscore'),
	newMsg;

module.exports = function(req, res) {
	Conversation.findByIdQ(req.params.convo_id)
		.then(function(convo) {
			newMsg = convo.messages.create(req.body);
			convo.messages.push(newMsg);
			return convo;
		})
		.then(function (convo) {
			convo.saveQ()
			.then(function(result) {
				console.log(newMsg);
				res.status(201).json(newMsg);
				return convo;
			})
			.then(function(convo){
				// _.each(convo.participants, function(room) {
				// 	io.sockets.in(room).emit('LALA', newMsg);
				// });
			})
			.done();

		}).fail(function (err) {
			res.status(500).send();
		})
		.done(function(){
			console.log(newMsg);
			//io.sockets.emit('lsls', newMsg);
		});

		io.sockets.emit('lsls', { content: 'ok',
  user: '5372cc146ffcad0000000001',
  _id: '537687795a9dca0000000002',
  sent: new Date() });
};