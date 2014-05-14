var Conversation = require('../../models/conversation'),
	mongoose = require('mongoose'),
	_ = require('underscore');

module.exports = function(req, res) {
	Conversation.findById(req.params.convo_id, function(err, convo) {

		if (err)
			res.status(500).send();

		convo.messages.push(req.body);

		// save the user
		convo.save(function(err) {
			if (err)
				res.status(500).send(err);

			res.status(204).json();
		});

	});

};