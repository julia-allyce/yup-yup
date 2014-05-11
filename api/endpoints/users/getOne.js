var User   = require('../../models/user'),
	getOne = module.exports = function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(user);
		});
	};