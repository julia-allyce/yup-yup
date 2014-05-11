var express    = require('express'),
	app = module.exports = express(),
	bodyParser = require('body-parser'),
	Conversation  = require('../models/conversation'),
	router     = express.Router();

app.use('/', router);