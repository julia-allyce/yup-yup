var Conversation = require('../../models/conversation'),
	mongoose = require('mongoose'),
	_ = require('underscore');

module.exports = function(req, res) {
	var convo = new Conversation();
	
	convo.addProps(req.body);

	convo.save(function (err) {
		if(err) {
			res.status(500).json(err);
		}

		res.status(201).json(convo);
	});

};