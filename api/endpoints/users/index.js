var express    = require('express'),
	router     = express.Router();
	
module.exports = function (passport) {
	router.route('/')
		.post(require('./post'))
		.get(passport.authenticate('local-login'), require('./getAll'));

	router.route('/:user_id')
		.get(passport.authenticate('local-login'), require('./getOne'))
		.put(passport.authenticate('local-login'), require('./put'))
		.delete(passport.authenticate('local-login'), require('./delete'));

	return router;
}