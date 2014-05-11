var express    = require('express'),
	app = module.exports = express(),
	bodyParser = require('body-parser'),
	User       = require('../models/user'),
	router     = express.Router();

app.use(bodyParser());

router.route('/')
	.post(function(req, res) {
		
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
		
	})
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.status(500).send(err);

			res.status(200).json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(user);
		});
	})
	.put(function(req, res) {

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
	})
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.status(500).send(err);

			res.status(204);
		});
	});

app.use('/', router);