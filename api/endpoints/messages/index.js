var express    = require('express'),
	app = module.exports = express(),
	bodyParser = require('body-parser'),
	router     = express.Router();

app.use(bodyParser());

router.route('/')
	.post(require('./post'))
	.get(require('./getAll'));

router.route('/:convo_id')
	.get(require('./getOne'))
	.put(require('./put'))
	.delete(require('./delete'));

app.use('/', router);