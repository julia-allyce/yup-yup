var User = require('../../models/user'),
	post = module.exports = function(req, res) {
		
		var user = new User({
			name: req.body.name,
			handle: req.body.handle,
			email: req.body.email,
			bio: req.body.bio,
			isActive: req.body.isActive
		}); 

		user.save(function(err) {
			if (err)
				res.status(500).status(500).send(err);

			res.status(201).json(user);
		});
		
	};