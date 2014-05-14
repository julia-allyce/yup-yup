var Conversation = require('../../models/conversation'),
    mongoose = require('mongoose'),
	getAll = module.exports = function(req, res) {
		Conversation.find({ participants: req.user._id}, null, function(err, convos) {
			if (err)
				res.status(500).send();

			res.status(200).json(convos);
		});
	};