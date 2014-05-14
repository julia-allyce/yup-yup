var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser'),
	router     = express.Router();

app.use(bodyParser());
module.exports = function (passport) {
	router.route('/')
		.post(require('./post'))
		.get(passport.authenticate('local-login'), require('./getAll'));

	router.route('/:user_id')
		.get(passport.authenticate('local-login'), require('./getOne'))
		.put(passport.authenticate('local-login'), require('./put'))
		.delete(passport.authenticate('local-login'), require('./delete'));

	app.use('/', router);

	return app;
}