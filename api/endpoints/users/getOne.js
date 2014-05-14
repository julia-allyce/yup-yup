var User   = require('../../models/user'),
	getOne = module.exports = function(req, res) {
		User.findById(req.params.user_id, ['name','handle','email','bio','isActive'].join(' '), function(err, user) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(user);
		});
	};