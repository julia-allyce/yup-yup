var express    = require('express'),
	app        = express(),
	router     = express.Router();
module.exports = function(passport) {
	router.route('/')
	.get(function(req, res) {
			req.logout();
			res.status('204').json();
	});
	app.use('/', router);
	return app;
};