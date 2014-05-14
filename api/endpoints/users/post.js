var User = require('../../models/user'),
	passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    User   = require('../../models/user'),
    session      = require('express-session');

require('../../../config/passport')(passport);

module.exports = function(req, res) {
		
		passport.authenticate('local-signup', function(err, user, msg) {
			if(err)
				res.status(500).json(err);
			if(user) {
				res.status(201).json(user.publicUser());
			} else {
				res.status(400).json(msg.content);
			}
		})(req, res);
		
	};