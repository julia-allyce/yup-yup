var User = require('../../models/user'),
	put = module.exports = function(req, res) {

		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.status(500).send(err);

			user.name = req.body.name;
			user.handle = req.body.handle;
			user.email = req.body.email;
			user.bio = req.body.bio;
			user.isActive = req.body.isActive;

			// save the user
			user.save(function(err) {
				if (err)
					res.status(500).send(err);

				res.status(200).json(user);
			});

		});
	};