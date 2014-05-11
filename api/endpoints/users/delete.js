var User  = require('../../models/user'),
	deleteUser = module.exports = function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.status(500).send(err);

			res.status(204);
		});
	};