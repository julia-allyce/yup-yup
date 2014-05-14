// call the packages we need
var express    = require('express'),
	app = module.exports = express();

app.use(express.static(__dirname + '/client'));

app.get('*', function (req, res) {
	 res.sendfile(__dirname + '/client/index.html');
});