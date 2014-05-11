var User   = require('../../models/user'),
	getAll = module.exports = function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.status(500).send(err);

			res.status(200).json(users);
		});
	};