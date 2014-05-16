var express    = require('express'),
	router     = express.Router();
module.exports = function(passport) {
	router.route('/')
		.get(function(req, res) {
				req.logout();
				res.status('204').json();
		});
	return router;
};