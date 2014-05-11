// call the packages we need
var express    = require('express'),
	app = module.exports = express();

app.use(express.static(__dirname + '/client'));

app.use('/', function (req, res, next) {
	//todo: passport auth
	next();
});

app.get('/', function (req, res) {
	 res.sendfile(__dirname + '/public/index.html');
});