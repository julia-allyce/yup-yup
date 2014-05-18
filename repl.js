var nesh = require('nesh');
var app = require('./server');

var options = {
	welcome: "Welcome to the yupyup chat server.",
	prompt: "yupyup>"
};

nesh.start(options, function (err, repl) {
	if (err) {
		nesh.log("ERROR:" + err);
	}

});