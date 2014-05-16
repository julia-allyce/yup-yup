// call the packages we need
var express    = require('express'),
	app = module.exports = express(),
	router = express.Router();

app.use(express.static(__dirname + '/client'));
router.route('/')
	.get(function (req, res) {
		res.sendfile(__dirname + '/client/index.html');
	});
app.use('/', router);