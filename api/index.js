// call the packages we need
var express      = require('express'),
	router       = express.Router(),
	bodyParser   = require('body-parser');

module.exports = function (passport) {
	router.use('/signin', require('./endpoints/signin/index')(passport));
	router.use('/signout', require('./endpoints/signout/index')(passport));
	router.use('/users', require('./endpoints/users/index')(passport));
	router.use('/conversations', require('./endpoints/conversations/index')(passport));

	return router;
}