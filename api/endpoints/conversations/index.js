var express    = require('express'),
	app 	   = express(),
	bodyParser = require('body-parser'),
	router     = express.Router();

app.use(bodyParser());

module.exports = function (passport) {

	router.route('/')
		.post(passport.authenticate('local-login'), require('./post'))
		.get(passport.authenticate('local-login'), require('./getAll'));

	router.route('/:convo_id')
	// 	.get(require('./getOne'))
	 	.post(passport.authenticate('local-login'), require('./postOne'));
	// 	.delete(require('./delete'));

	app.use('/', router);
	return app;
}