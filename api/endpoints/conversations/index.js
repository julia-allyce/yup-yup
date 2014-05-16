var express    = require('express'),
	router     = express.Router();

module.exports = function (passport) {

	router.route('/')
		.post(passport.authenticate('local-login'), require('./post'))
		.get(passport.authenticate('local-login'), require('./getAll'));

	router.route('/:convo_id')
	// 	.get(require('./getOne'))
	 	.post(passport.authenticate('local-login'), require('./postOne'));
	// 	.delete(require('./delete'));

	return router;
}