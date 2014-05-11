// call the packages we need
var express      = require('express'),
	app          = module.exports = express(),
	router       = express.Router();

router.use('/', function (req, res, next) {

	//todo: passport auth
	next();
});

router.use('/users', require('./endpoints/users/index'));
// router.use('/conversations', require('./endpoints/conversations/index'));
// router.use('/messages', require('./endpoints/messages/index'));

app.use('/', router);