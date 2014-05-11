var express    = require('express'),
	app = module.exports = express(),
	bodyParser = require('body-parser'),
	Message    = require('../models/message'),
	router     = express.Router();

app.use('/', router);